import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFinishingInputs,
  resetFinishingInputs,
} from "../store/slices/finishingSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const FinishingInputForm = () => {
  const dispatch = useDispatch();
  const finishingData = useSelector((state) => state.finishing) || {};
  const { units } = useProjectSettings();

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = name.startsWith("customTile");

    if (isNumberField && value !== "" && Number(value) < 0) return;

    dispatch(
      updateFinishingInputs({
        [name]: isNumberField ? (value === "" ? "" : Number(value)) : value,
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Finishing Works Parameters (Plaster, Paint & Tiling)
        </h3>
        <button
          type="button"
          onClick={() => dispatch(resetFinishingInputs())}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Plaster Standard Selection */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Plaster Standard
          </label>
          <select
            name="plasterStandardKey"
            value={finishingData.plasterStandardKey || "IS_1661"}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="IS_1661">IS 1661 (Standard Cement Plaster)</option>
          </select>
        </div>

        {/* Paint Standard Selection */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Paint Standard
          </label>
          <select
            name="paintStandardKey"
            value={finishingData.paintStandardKey || "IS_2395"}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="IS_2395">IS 2395 (Primer & Emulsion Coating)</option>
          </select>
        </div>

        {/* Tile Standard Selection */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Tile Standard
          </label>
          <select
            name="tileStandardKey"
            value={finishingData.tileStandardKey || "IS_1443"}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="IS_1443">
              IS 1443 (Vitrified / Ceramic Flooring)
            </option>
          </select>
        </div>

        {/* Tile Custom Dimensions */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
              Tile Length ({units.length})
            </label>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChars}
              name="customTileLength"
              value={finishingData.customTileLength ?? 0.6}
              onChange={handleChange}
              step="0.05"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
              Tile Width ({units.length})
            </label>
            <input
              type="number"
              min="0"
              onKeyDown={blockInvalidChars}
              name="customTileWidth"
              value={finishingData.customTileWidth ?? 0.6}
              onChange={handleChange}
              step="0.05"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishingInputForm;
