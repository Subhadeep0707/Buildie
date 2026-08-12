import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateRwhInputs,
  resetRwhInputs,
  toggleRwhIncluded,
} from "../store/slices/rwhSlice";

const RwhInputForm = () => {
  const dispatch = useDispatch();
  const rwhData = useSelector((state) => state.rwh) || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateRwhInputs({
        [name]:
          name === "annualRainfallMm" ||
          name === "roofAreaSqM" ||
          name === "runoffCoefficient"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleRwhIncluded(e.target.checked));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 dark:border-gray-700 gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Rainwater Harvesting Inputs
          </h3>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={rwhData.isIncluded || false}
              onChange={handleToggle}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Include RWH</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => dispatch(resetRwhInputs())}
          className="text-xs text-red-500 hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Roof Catchment Area (m²)
          </label>
          <input
            type="number"
            name="roofAreaSqM"
            placeholder="Inferred from total area if blank"
            value={rwhData.roofAreaSqM ?? ""}
            onChange={handleChange}
            disabled={!rwhData.isIncluded}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Annual Rainfall (mm)
          </label>
          <input
            type="number"
            name="annualRainfallMm"
            value={rwhData.annualRainfallMm ?? 1000}
            onChange={handleChange}
            disabled={!rwhData.isIncluded}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Runoff Coefficient
          </label>
          <select
            name="runoffCoefficient"
            value={rwhData.runoffCoefficient ?? 0.85}
            onChange={handleChange}
            disabled={!rwhData.isIncluded}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value={0.85}>Concrete / Tiled Roof (0.85)</option>
            <option value={0.9}>Metal Sheeting (0.90)</option>
            <option value={0.75}>Paved Yard (0.75)</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Filtration Mechanism
          </label>
          <select
            name="filterType"
            value={rwhData.filterType ?? "mesh"}
            onChange={handleChange}
            disabled={!rwhData.isIncluded}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="mesh">Stainless Steel Mesh Filter</option>
            <option value="sand">First-Flush Sand Filter</option>
            <option value="dual">Dual Stage Carbon Filter</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RwhInputForm;
