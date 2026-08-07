import { useState, useEffect } from "react";
import { boqGenerator } from "../../domain/boqGenerator";
import { calculateCost } from "../../domain/costCalculation";
import { estimateRooms } from "../../domain/roomEstimator";
import { calculateProjectEstimate } from "../../store/slices/boqSlice";
import InputForm from "../../components/inputForm";
import CostChart from "../../components/costChart";
import WorkspaceSidebar from "./sections/WorkspaceSidebar";
import MaterialRates from "./sections/MaterialRates";
import OpeningSection from "./sections/OpeningSection";
import OpeningBreakdown from "./sections/OpeningBreakdown";
import BoqSection from "./sections/BoqSection";
import SolarInputForm from "../../customServices/solarInputForm";
import LiftInputForm from "../../customServices/liftInputForm";
import PumpInputForm from "../../customServices/pumpInputForm";
import RwhInputForm from "../../customServices/rwhInputForm";
import SeptictankInputForm from "../../customServices/septiktankInputForm";
import StructuralInputForm from "../../customServices/structuralInputForm";
import EarthworkInputForm from "../../customServices/earthworkInputForm";
import StaircaseInputForm from "../../customServices/staircaseInputForm";
import FinishingInputForm from "../../customServices/finishingInputForm";
import FirefightingForm from "../../customServices/firefightingInputForm";
import PlumbingInputForm from "../../customServices/plumbingInputForm";
import ElectricityInputForm from "../../customServices/electricityInputForm";
import { useSelector, useDispatch } from "react-redux";
import { updateRates } from "../../store/slices/rateSlice";
import {
  addFloor,
  removeFloor,
  updateFloorName,
  addRoom,
  updateRoom,
  removeRoom,
  setFloors,
} from "../../store/slices/roomSlice";
import { saveProjectAsync } from "../../store/slices/projectSlice";

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [activeSection, setActiveSection] = useState("boq");
  const [mode, setMode] = useState("volume");
  const solarState = useSelector((state) => state.solar);
  const liftState = useSelector((state) => state.lift);
  const pumpState = useSelector((state) => state.pump);
  const rwhState = useSelector((state) => state.rwh);
  const septiktankState = useSelector((state) => state.septiktank);
  const structuralState = useSelector((state) => state.structural);
  const earthworkState = useSelector((state) => state.earthwork);
  const staircaseState = useSelector((state) => state.staircase);
  const finishingState = useSelector((state) => state.finishing);
  const firefightingState = useSelector((state) => state.firefighting);
  const plumbingState = useSelector((state) => state.plumbing);
  const electricityState = useSelector((state) => state.electricity);
  const [formData, setFormData] = useState({
    grade: "M20",
    volume: "",
    length: "",
    width: "",
    slabThickness: "",
    wallHeight: "",
    wallThickness: "",
  });

  const [projectName, setProjectName] = useState("");

  // Redux state for price rates
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates.rates);

  // Redux state for rooms
  const floors = useSelector((state) => state.rooms.floors);
  const activeProject = useSelector((state) => state.projects.activeProject);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  // ROOM DATA
  const allRooms = (floors || []).flatMap((floor) => floor.rooms || []);
  const roomData = estimateRooms(allRooms);

  const handleAddFloor = () => {
    dispatch(addFloor());
  };

  const handleRemoveFloor = (floorIndex) => {
    dispatch(removeFloor(floorIndex));
  };

  const handleUpdateFloorName = (floorIndex, name) => {
    dispatch(
      updateFloorName({
        floorIndex,
        name,
      }),
    );
  };

  const handleAddRoom = (floorIndex) => {
    dispatch(addRoom(floorIndex));
  };

  const handleUpdateRoom = (floorIndex, roomIndex, updatedRoom) => {
    dispatch(
      updateRoom({
        floorIndex,
        roomIndex,
        updatedRoom,
      }),
    );
  };

  const handleRemoveRoom = (floorIndex, roomIndex) => {
    dispatch(
      removeRoom({
        floorIndex,
        roomIndex,
      }),
    );
  };

  // SAVE PROJECT
  const handleSaveProject = () => {
    if (!result) {
      alert("Run calculation first");
      return;
    }

    const newProject = {
      name: projectName || `Project ${Date.now()}`,
      formData,
      mode,
      floors,
      roomData,
      result,
      createdAt: new Date().toISOString(),
    };
    console.log("SAVING PROJECT TO BACKEND:", newProject);
    //.unwrap() to wait for the API response
    dispatch(saveProjectAsync(newProject))
      .unwrap()
      .then(() => {
        setProjectName("");
        alert("Project Saved Successfully!");
      })
      .catch((err) => {
        alert(`Failed to save project: ${err}`);
      });
  };

  //Calculation
  const handleCalculate = (formValues) => {
    const projectPayload = {
      totalArea: Number(formValues.volume) || 0,
      concreteGrade: formValues.grade,
      slabVolume:
        mode === "volume"
          ? Number(formValues.volume)
          : Number(formValues.length) *
            Number(formValues.width) *
            Number(formValues.slabThickness),
      wallVolume: roomData?.totals?.brickVolume || 0,
      floors,
      roomData,
      rates,
      foundationInput: earthworkState,
      solarInput: solarState,
      liftInput: liftState,
      pumpInput: pumpState,
      rwhInput: rwhState,
      septicUserCount: septiktankState?.septicUserCount || 5,
      structuralInputs: structuralState,
      staircaseInput: staircaseState,
      finishingInput: finishingState,
      firefightingInput: firefightingState,
      plumbingInput: plumbingState,
      electricityInput: electricityState,
    };
    dispatch(calculateProjectEstimate(projectPayload))
      .unwrap()
      .then((calculatedData) => {
        setResult(calculatedData);
      })
      .catch((error) => {
        console.error("Calculation failed:", error);
      });
  };

  // LOAD ACTIVE PROJECT
  useEffect(() => {
    if (!activeProject) return;
    dispatch(setFloors(activeProject.floors));
    setProjectName(activeProject.name);
    setResult(activeProject.result);
    setFormData(
      activeProject.formData || {
        grade: "M20",
        volume: "",
        length: "",
        width: "",
        slabThickness: "",
        wallHeight: "",
        wallThickness: "",
      },
    );

    setMode(activeProject.mode || "volume");
  }, [activeProject, dispatch]);

  return (
    <div className="flex h-full w-full gap-6 dark:text-white p-6 overflow-hidden bg-gray-100 dark:bg-[#12141c]">
      {/* WORKSPACE SIDEBAR */}
      <div className="w-56 h-full flex-shrink-0">
        <WorkspaceSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* MAIN CONTENT AREA  */}
      <div className="flex-1 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Core Inputs & Save*/}
          {/* Scrollable internally  */}
          <div className="h-full overflow-y-auto flex flex-col gap-6 pr-2 pb-4">
            <InputForm
              onCalculate={handleCalculate}
              mode={mode}
              setMode={setMode}
              formData={formData}
              setFormData={setFormData}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded">
                {error}
              </div>
            )}

            {/* Save Project  */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col gap-3 mt-auto border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Project Management
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border p-2 rounded flex-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleSaveProject}
                  disabled={loading}
                  className={`px-4 py-2 rounded text-white transition font-medium ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Saving..." : "Save Project"}
                </button>
              </div>
            </div>
          </div>

          {/* Contextual Forms filling the space */}
          {/* Scrollable internally, dynamically shows content based on Workspace selection */}
          <div className="h-full overflow-y-auto flex flex-col gap-6 pr-2 pb-4">
            {/* BOQ Selection Active */}
            {activeSection === "boq" && (
              <>
                {result ? (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-center min-h-[320px] p-4 border border-gray-200 dark:border-gray-700">
                      <CostChart result={result} />
                    </div>
                    <BoqSection result={result} />
                  </>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-center h-64 border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500">
                    Run calculations on the left to view chart and BOQ
                  </div>
                )}
              </>
            )}

            {/* Solar Module  */}
            {activeSection === "solar" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <SolarInputForm />
              </div>
            )}

            {/* Lift Module */}
            {activeSection === "lift" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <LiftInputForm />
              </div>
            )}

            {/* Pump MOdule */}
            {activeSection === "pump" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <PumpInputForm />
              </div>
            )}

            {/* Rain Water Harvesting MOdule */}
            {activeSection === "rwh" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <RwhInputForm />
              </div>
            )}

            {/*Septic Tank module */}
            {activeSection === "septic" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <SeptictankInputForm />
              </div>
            )}

            {/*Structural module */}
            {activeSection === "structural" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <StructuralInputForm />
              </div>
            )}

            {/*Earthwork module */}
            {activeSection === "earthwork" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <EarthworkInputForm />
              </div>
            )}

            {/*Staircase Module */}
            {activeSection === "stair" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <StaircaseInputForm />
              </div>
            )}

            {/* Finishing Module */}
            {activeSection === "finishing" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <FinishingInputForm />
              </div>
            )}

            {/* Firefighting Module */}
            {activeSection === "firefighting" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <FirefightingForm />
              </div>
            )}

            {/* Plumbing module */}
            {activeSection === "plumbing" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <PlumbingInputForm />
              </div>
            )}

            {/* Electricity module */}
            {activeSection === "electricity" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <ElectricityInputForm />
              </div>
            )}

            {/* Openings Selection Active */}
            {activeSection === "openings" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <OpeningSection
                  floors={floors}
                  updateRoom={handleUpdateRoom}
                  removeRoom={handleRemoveRoom}
                  addRoom={handleAddRoom}
                  addFloor={handleAddFloor}
                  removeFloor={handleRemoveFloor}
                  updateFloorName={handleUpdateFloorName}
                />
              </div>
            )}

            {/* Breakdown Selection Active */}
            {activeSection === "breakdown" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <OpeningBreakdown roomData={roomData} />
              </div>
            )}

            {/* Rates Selection Active */}
            {activeSection === "rates" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <MaterialRates
                  rates={rates}
                  setRates={(updatedRates) =>
                    dispatch(updateRates(updatedRates))
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
