import React from "react";
import { useProjectSettings } from "../../../store/slices/useProjectSettings";

const OpeningSection = ({
  floors,
  addFloor,
  removeFloor,
  updateFloorName,
  updateFloor,
}) => {
  const { units } = useProjectSettings(); 
  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleNumberChange = (floorIndex, field, value) => {
    if (value !== "" && Number(value) < 0) return;
    updateFloor(floorIndex, field, value === "" ? "" : Number(value));
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Macro Area Configuration
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure floors using total area (Macro mode)
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
          {floors.length} Floors Configured
        </div>
      </div>

      <div className="space-y-4">
        {floors.map((floor, floorIndex) => (
          <div
            key={floorIndex}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-[#232734]"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
              <input
                type="text"
                value={floor.name || `Floor ${floorIndex + 1}`}
                onChange={(e) => updateFloorName(floorIndex, e.target.value)}
                className="font-bold bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 outline-none text-gray-800 dark:text-white transition-colors pb-1 w-1/2"
              />
              <button
                onClick={() => removeFloor(floorIndex)}
                disabled={floors.length === 1}
                className={`text-xs font-bold transition-colors ${
                  floors.length === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:text-red-700 cursor-pointer"
                }`}
              >
                Delete Floor
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-semibold uppercase">
                  Total Area ({units.area})
                </label>
                <input
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChars}
                  value={floor.area ?? ""}
                  onChange={(e) =>
                    handleNumberChange(floorIndex, "area", e.target.value)
                  }
                  placeholder="0.0"
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-semibold uppercase">
                  Floor Height ({units.length})
                </label>
                <input
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChars}
                  value={floor.height ?? ""}
                  onChange={(e) =>
                    handleNumberChange(floorIndex, "height", e.target.value)
                  }
                  placeholder="3.0"
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-semibold uppercase">
                  Wall Thick ({units.length})
                </label>
                <input
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChars}
                  value={floor.wallThickness ?? ""}
                  onChange={(e) =>
                    handleNumberChange(
                      floorIndex,
                      "wallThickness",
                      e.target.value,
                    )
                  }
                  placeholder="0.23"
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-semibold uppercase">
                  Slab Thick ({units.length})
                </label>
                <input
                  type="number"
                  min="0"
                  onKeyDown={blockInvalidChars}
                  value={floor.slabThickness ?? ""}
                  onChange={(e) =>
                    handleNumberChange(
                      floorIndex,
                      "slabThickness",
                      e.target.value,
                    )
                  }
                  placeholder="0.15"
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={addFloor}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span>+</span> Add New Floor
        </button>
      </div>
    </div>
  );
};

export default OpeningSection;
