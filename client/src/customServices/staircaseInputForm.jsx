import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStaircaseInputs,
  resetStaircaseInputs,
} from "../store/slices/staircaseSlice";

const StaircaseInputForm = () => {
  const dispatch = useDispatch();
  const staircaseData = useSelector((state) => state.staircase) || {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateStaircaseInputs({
        [name]: value === "" ? "" : Number(value),
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Staircase Parameters (IS 456)
        </h3>
        <button
          type="button"
          onClick={() => dispatch(resetStaircaseInputs())}
          className="text-xs text-red-500 hover:underline"
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
            name="numberOfFloors"
            value={staircaseData.numberOfFloors ?? 1}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Floor Height (m)
          </label>
          <input
            type="number"
            name="floorHeightM"
            value={staircaseData.floorHeightM ?? 3.0}
            onChange={handleChange}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Flight Width (m)
          </label>
          <input
            type="number"
            name="flightWidthM"
            value={staircaseData.flightWidthM ?? 1.2}
            onChange={handleChange}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600 dark:text-gray-400">
            Flight Length (m)
          </label>
          <input
            type="number"
            name="flightLengthM"
            value={staircaseData.flightLengthM ?? 4.0}
            onChange={handleChange}
            step="0.1"
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default StaircaseInputForm;
