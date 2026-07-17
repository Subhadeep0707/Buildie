import { useState, useEffect } from "react";
import { boqGenerator } from "../../domain/boqGenerator";
import { calculateCost } from "../../domain/costCalculation";
import { estimateRooms } from "../../domain/roomEstimator";
import InputForm from "../../components/inputForm";
import CostChart from "../../components/costChart";
import WorkspaceSidebar from "./sections/WorkspaceSidebar";
import MaterialRates from "./sections/MaterialRates";
import OpeningSection from "./sections/OpeningSection";
import OpeningBreakdown from "./sections/OpeningBreakdown";
import BoqSection from "./sections/BoqSection";
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
      id: Date.now(),
      name: projectName || `Project ${Date.now()}`,
      formData,
      mode,
      floors,
      roomData,
      result,
      createdAt: new Date().toISOString(),
    };
    console.log("SAVING PROJECT:", newProject);
    dispatch(saveProjectAsync(newProject));
    setProjectName("");
    alert("Project Saved!");
  };

  // CALCULATE
  const handleCalculate = ({ grade, volume, length, width, slabThickness }) => {
    let finalVolume = Number(volume);

    // Slab calculation
    if (mode === "area") {
      const L = Number(length);
      const W = Number(width);
      const slabT = Number(slabThickness);

      if (L <= 0 || W <= 0 || slabT <= 0) {
        setResult(null);
        return;
      }

      finalVolume = L * W * slabT;
    }

    // Room wall calculation
    finalVolume += roomData.totals.brickVolume;

    const finalResult = boqGenerator(grade, finalVolume);

    if (!finalResult) {
      setResult(null);
      return;
    }
    const cost = calculateCost(finalResult, rates);
    console.log("FINAL RESULT:", finalResult);
    console.log("COST:", cost);

    setResult({
      ...finalResult,
      ...cost,
      totalVolume: finalVolume,
      plasterArea: roomData.totals.plasterArea,
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
    <div className="flex gap-6 dark:text-white">
      {/* Workspace Sidebar */}
      <WorkspaceSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex flex-col gap-6">
        {/* Top Section */}
        <div
          className={`w-full max-w-6xl grid gap-6 mb-4 ${
            activeSection === "boq" ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          <div className="flex flex-col gap-3">
            <InputForm
              onCalculate={handleCalculate}
              mode={mode}
              setMode={setMode}
              formData={formData}
              setFormData={setFormData}
            />

            {/* Openings */}
            {activeSection === "openings" && (
              <OpeningSection
                floors={floors}
                updateRoom={handleUpdateRoom}
                removeRoom={handleRemoveRoom}
                addRoom={handleAddRoom}
                addFloor={handleAddFloor}
                removeFloor={handleRemoveFloor}
                updateFloorName={handleUpdateFloorName}
              />
            )}

            {/* Material Rates */}
            {activeSection === "rates" && (
              <MaterialRates
                rates={rates}
                setRates={(updatedRates) => dispatch(updateRates(updatedRates))}
              />
            )}

            {/* Save Project */}
            <div
              className="
                bg-white
                dark:bg-gray-800
                p-3
                rounded-xl
                shadow
                flex
                gap-2
              "
            >
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="
                  border
                  p-2
                  rounded
                  flex-1
                  bg-white
                  dark:bg-gray-700
                  dark:text-white
                  dark:border-gray-600
                "
              />

              <button
                onClick={handleSaveProject}
                disabled={loading}
                className={`px-4 rounded text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Save Project"}
              </button>
            </div>

            {error && (
              <div
                className="
                  bg-red-100
                  dark:bg-red-900
                  text-red-700
                  dark:text-red-200
                  p-3
                  rounded
                "
              >
                {error}
              </div>
            )}
          </div>

          {/* Chart */}
          {activeSection === "boq" && result && (
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow
                flex
                items-center
                justify-center
                min-h-[320px]
              "
            >
              <CostChart result={result} />
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div
          className={`w-full max-w-6xl grid gap-6 ${
            activeSection === "boq" ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {/* BOQ */}
          {activeSection === "boq" && result && <BoqSection result={result} />}

          {/* Openings Breakdown */}
          {activeSection === "breakdown" && (
            <OpeningBreakdown roomData={roomData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
