import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSepticInputs,
  resetSepticInputs,
  toggleSepticIncluded,
} from "../store/slices/septictankSlice";

const SeptictankInputForm = () => {
  const dispatch = useDispatch();
  // Defensive fallback object
  const septicData = useSelector((state) => state.septictank) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateSepticInputs({
        [name]: value === "" ? "" : Number(value),
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleSepticIncluded(e.target.checked));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 dark:border-gray-700 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Septic Tank Inputs (IS 2470)
          </h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={septicData.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include Septic Tank</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => dispatch(resetSepticInputs())}
          className="text-xs text-red-500 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Number of Occupants / Users
          </label>
          <input
            type="number"
            name="septicUserCount"
            value={septicData.septicUserCount ?? 5}
            onChange={handleChange}
            disabled={!septicData.isIncluded}
            min="1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Determines tank dimensions, chamber design (single vs dual), and
            capacity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeptictankInputForm;
