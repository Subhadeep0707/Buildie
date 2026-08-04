import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSepticInputs,
  resetSepticInputs,
} from "../store/slices/septictankSlice";

const SeptictankInputForm = () => {
  const dispatch = useDispatch();
  // Defensive fallback object
  const septicData = useSelector((state) => state.septic) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateSepticInputs({
        [name]: value === "" ? "" : Number(value),
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Septic Tank Inputs (IS 2470)
        </h3>
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
            min="1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Determines tank dimensions, chamber design (single vs dual), and capacity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeptictankInputForm;