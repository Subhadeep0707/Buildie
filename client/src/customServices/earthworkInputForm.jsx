import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEarthworkInputs,
  resetEarthworkInputs,
} from "../store/slices/earthworkSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const EarthworkInputForm = () => {
  const dispatch = useDispatch();
  const earthworkData = useSelector((state) => state.earthwork) || {};
  const { units } = useProjectSettings();

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && Number(value) < 0) return;

    dispatch(
      updateEarthworkInputs({
        [name]: name === "type" ? value : value === "" ? "" : Number(value),
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Earthwork & Excavation Parameters (IS 1200 Part 1)
        </h3>
        <button
          type="button"
          onClick={() => dispatch(resetEarthworkInputs())}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Footing Type Selection */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Foundation Type
          </label>
          <select
            name="type"
            value={earthworkData.type || "isolatedFooting"}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="isolatedFooting">Isolated Column Footing</option>
            <option value="wallStripFooting">Wall Strip Footing</option>
          </select>
        </div>

        {earthworkData.type === "isolatedFooting" ? (
          <>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Number of Footings
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="numberOfFootings"
                value={earthworkData.numberOfFootings ?? 1}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Custom Depth ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="customDepth"
                value={earthworkData.customDepth ?? 1.5}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Footing Length ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="footingLength"
                value={earthworkData.footingLength ?? 1.5}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Footing Width ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="footingWidth"
                value={earthworkData.footingWidth ?? 1.5}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Strip Length ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="stripLengthMeters"
                value={earthworkData.stripLengthMeters ?? 10}
                onChange={handleChange}
                step="0.5"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Custom Depth ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="customDepth"
                value={earthworkData.customDepth ?? 1.5}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EarthworkInputForm;
