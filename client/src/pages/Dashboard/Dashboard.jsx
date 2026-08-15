import { useState, useEffect } from "react";
import { calculateProjectEstimate } from "../../store/slices/boqSlice";
import InputForm from "../../components/inputForm";
import CostChart from "../../components/costChart";
import WorkspaceSidebar from "./sections/WorkspaceSidebar";
import MaterialRates from "./sections/MaterialRates";
import OpeningSection from "./sections/OpeningSection";
import OpeningBreakdown from "./sections/OpeningBreakdown";
import BoqSection from "./sections/BoqSection";
import DetailedRoomForm from "../../components/detailedRoomForm";
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
  updateFloor,
  setFloors,
} from "../../store/slices/roomSlice";
import { saveProjectAsync } from "../../store/slices/projectSlice";
import { useProjectSettings } from "../../store/slices/useProjectSettings";

const Dashboard = () => {
  const [result, setResult] = useState(null);
  const [activeSection, setActiveSection] = useState("boq");

  const { unitSystem, currency } = useProjectSettings();

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
  });

  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");

  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates.rates);

  const floors = useSelector((state) => state.rooms.floors);
  const detailedRooms = useSelector((state) => state.detailedRooms.rooms);
  const activeProject = useSelector((state) => state.projects.activeProject);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

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

  const handleUpdateFloor = (floorIndex, field, value) => {
    dispatch(
      updateFloor({
        floorIndex,
        field,
        value,
      }),
    );
  };

  const handleSaveProject = () => {
    if (!result) {
      alert("Run calculation first");
      return;
    }

    const newProject = {
      name: projectName || `Project ${Date.now()}`,
      clientName: clientName || "Unknown Client",
      formData,
      floors,
      detailedRooms,
      result,
      createdAt: new Date().toISOString(),
    };

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

  const handleCalculate = (formValues) => {
    const hasDetailedRooms = detailedRooms.some(
      (room) => room.length > 0 && room.width > 0,
    );

    const projectPayload = {
      settings: {
        unitSystem,
        currency,
      },
      totalArea: 0,
      concreteGrade: formValues.grade,
      slabVolume: 0,
      wallVolume: 0,

      floorsInput: floors,
      detailedRoomsInput: hasDetailedRooms ? detailedRooms : null,

      rates,
      foundationInput: earthworkState,
      structuralInputs: structuralState,
      staircaseInput: staircaseState?.isIncluded ? staircaseState : null,
      finishingInput: finishingState,
      solarInput: solarState?.isIncluded ? solarState : null,
      liftInput: liftState?.isIncluded ? liftState : null,
      pumpInput: pumpState?.isIncluded ? pumpState : null,
      rwhInput: rwhState?.isIncluded ? rwhState : null,
      septicUserCount: septiktankState?.isIncluded
        ? septiktankState.septicUserCount
        : null,
      firefightingInput: firefightingState?.isIncluded
        ? firefightingState
        : null,
      plumbingInput: plumbingState?.isIncluded ? plumbingState : null,
      electricityInput: electricityState?.isIncluded ? electricityState : null,
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

  useEffect(() => {
    if (!activeProject) return;
    dispatch(setFloors(activeProject.floors));
    setProjectName(activeProject.name);
    setClientName(activeProject.clientName || "");
    setResult(activeProject.result);
    setFormData(
      activeProject.formData || {
        grade: "M20",
      },
    );
  }, [activeProject, dispatch]);

  return (
    <div className="flex h-full w-full gap-6 dark:text-white p-6 overflow-hidden bg-gray-100 dark:bg-[#12141c]">
      <div className="w-56 h-full flex-shrink-0">
        <WorkspaceSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      <div className="flex-1 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="h-full overflow-y-auto flex flex-col gap-6 pr-2 pb-4">
            <InputForm
              onCalculate={handleCalculate}
              formData={formData}
              setFormData={setFormData}
            />

            {error && (
              <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded">
                {error}
              </div>
            )}

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
                <input
                  type="text"
                  placeholder="Client Name (Optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
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

          <div className="h-full overflow-y-auto flex flex-col gap-6 pr-2 pb-4">
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

            {activeSection === "solar" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <SolarInputForm />
              </div>
            )}

            {activeSection === "lift" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <LiftInputForm />
              </div>
            )}

            {activeSection === "pump" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <PumpInputForm />
              </div>
            )}

            {activeSection === "rwh" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <RwhInputForm />
              </div>
            )}

            {activeSection === "septic" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <SeptictankInputForm />
              </div>
            )}

            {activeSection === "structural" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <StructuralInputForm />
              </div>
            )}

            {activeSection === "earthwork" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <EarthworkInputForm />
              </div>
            )}

            {activeSection === "stair" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <StaircaseInputForm />
              </div>
            )}

            {activeSection === "finishing" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <FinishingInputForm />
              </div>
            )}

            {activeSection === "firefighting" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <FirefightingForm />
              </div>
            )}

            {activeSection === "plumbing" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <PlumbingInputForm />
              </div>
            )}

            {activeSection === "electricity" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <ElectricityInputForm />
              </div>
            )}

            {activeSection === "openings" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <OpeningSection
                  floors={floors}
                  addFloor={handleAddFloor}
                  removeFloor={handleRemoveFloor}
                  updateFloorName={handleUpdateFloorName}
                  updateFloor={handleUpdateFloor}
                />
              </div>
            )}

            {activeSection === "detailedRooms" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <DetailedRoomForm />
              </div>
            )}

            {activeSection === "breakdown" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
                <OpeningBreakdown
                  floorData={result?.breakdown?.floorsBreakdown}
                />
              </div>
            )}

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
