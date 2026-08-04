import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRwhInputs, resetRwhInputs } from "../store/slices/rwhSlice";

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Rainwater Harvesting Inputs
        </h3>
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
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
