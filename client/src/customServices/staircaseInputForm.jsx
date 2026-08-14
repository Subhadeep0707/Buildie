import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStaircaseInputs,
  resetStaircaseInputs,
  toggleStaircaseIncluded,
} from "../store/slices/staircaseSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const StaircaseInputForm = () => {
  const dispatch = useDispatch();
  const staircaseData = useSelector((state) => state.staircase) || {};
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
      updateStaircaseInputs({
        [name]: value === "" ? "" : Number(value),
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleStaircaseIncluded(e.target.checked));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 dark:border-gray-700 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Staircase Parameters (IS 456)
          </h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={staircaseData.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include Staircase</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => dispatch(resetStaircaseInputs())}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Number of Floors
          </label>
          <input
            type="number"
            min="1"
            onKeyDown={blockInvalidChars}
            name="numberOfFloors"
            value={staircaseData.numberOfFloors ?? 1}
            onChange={handleChange}
            disabled={!staircaseData.isIncluded}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Floor Height ({units.length})
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChars}
            name="floorHeightM"
            value={staircaseData.floorHeightM ?? 3.0}
            onChange={handleChange}
            disabled={!staircaseData.isIncluded}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Flight Width ({units.length})
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChars}
            name="flightWidthM"
            value={staircaseData.flightWidthM ?? 1.2}
            onChange={handleChange}
            disabled={!staircaseData.isIncluded}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Flight Length ({units.length})
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChars}
            name="flightLengthM"
            value={staircaseData.flightLengthM ?? 4.0}
            onChange={handleChange}
            disabled={!staircaseData.isIncluded}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default StaircaseInputForm;
