import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSolarInputs,
  resetSolarInputs,
  toggleSolarIncluded,
} from "../store/slices/solarSlice";

export default function SolarInputForm() {
  const dispatch = useDispatch();
  const solarState = useSelector((state) => state.solar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateSolarInputs({
        [name]: value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleSolarIncluded(e.target.checked));
  };

  const handleReset = () => {
    dispatch(resetSolarInputs());
  };

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER WITH RESET BUTTON & CHECKBOX */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 dark:border-gray-700 pb-2 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Solar Rooftop Configuration
          </h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={solarState.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include Solar</span>
          </label>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
        >
          Reset Form
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          System Capacity (kW)
        </label>
        <input
          type="number"
          name="systemCapacityKw"
          placeholder="Auto-derived if empty"
          value={solarState.systemCapacityKw || ""}
          onChange={handleChange}
          disabled={!solarState.isIncluded}
          className="border p-2.5 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span className="text-xs text-gray-400">
          Leave blank to estimate automatically from available roof area.
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Roof Area (sq. m)
        </label>
        <input
          type="number"
          name="roofAreaSqM"
          placeholder="e.g. 100"
          value={solarState.roofAreaSqM || ""}
          onChange={handleChange}
          disabled={!solarState.isIncluded}
          className="border p-2.5 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Turnkey Cost per kW (₹)
        </label>
        <input
          type="number"
          name="costPerKwINR"
          value={solarState.costPerKwINR ?? 50000}
          onChange={handleChange}
          disabled={!solarState.isIncluded}
          className="border p-2.5 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
