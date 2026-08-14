import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStructuralInputs,
  resetStructuralInputs,
} from "../store/slices/structuralSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const StructuralInputForm = () => {
  const dispatch = useDispatch();
  const structuralData = useSelector((state) => state.structural) || {};
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
      updateStructuralInputs({
        [name]: value === "" ? "" : Number(value),
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Structural Layout & Member Dimensions (IS 456:2000)
        </h3>
        <button
          type="button"
          onClick={() => dispatch(resetStructuralInputs())}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Column Dimensions */}
        <div className="space-y-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">
            Column Parameters
          </h4>
          <div>
            <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
              Height per Floor ({units.length})
            </label>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChars}
              name="columnHeightM"
              value={structuralData.columnHeightM ?? 3.0}
              onChange={handleChange}
              step="0.1"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Width ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="columnWidthM"
                value={structuralData.columnWidthM ?? 0.3}
                onChange={handleChange}
                step="0.05"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
                Depth ({units.length})
              </label>
              <input
                type="number"
                min="0"
                onKeyDown={blockInvalidChars}
                name="columnDepthM"
                value={structuralData.columnDepthM ?? 0.3}
                onChange={handleChange}
                step="0.05"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Beam Dimensions */}
        <div className="space-y-3 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">
            Beam Parameters
          </h4>
          <div>
            <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
              Width ({units.length})
            </label>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChars}
              name="beamWidthM"
              value={structuralData.beamWidthM ?? 0.23}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
              Depth ({units.length})
            </label>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChars}
              name="beamDepthM"
              value={structuralData.beamDepthM ?? 0.375}
              onChange={handleChange}
              step="0.01"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Grid structural layout, column counts, and beam segments are
        automatically calculated based on the total area according to IS 456
        grid parameters.
      </p>
    </div>
  );
};

export default StructuralInputForm;
