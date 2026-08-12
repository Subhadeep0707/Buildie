import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFirefightingInputs,
  toggleFirefightingIncluded,
} from "../store/slices/firefightingSlice";

const FirefightingForm = () => {
  const dispatch = useDispatch();
  // Grab both inputs and the new isIncluded flag
  const { inputs, isIncluded } = useSelector(
    (state) => state.firefighting || { inputs: {} },
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateFirefightingInputs({
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? parseFloat(value) || 0
              : value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleFirefightingIncluded(e.target.checked));
  };

  return (
    <div className="w-full">
      {/* Header & Simple Checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Firefighting & Life Safety System
          </h3>
        </div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isIncluded || false}
            onChange={handleToggle}
            className="w-4 h-4 cursor-pointer"
          />
          <span>Include Firefighting</span>
        </label>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total Built-up Area (sq.m)
          </label>
          <input
            type="number"
            name="totalAreaSqM"
            value={inputs.totalAreaSqM || ""}
            onChange={handleChange}
            placeholder="e.g. 500"
            disabled={!isIncluded}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Floors
          </label>
          <input
            type="number"
            name="numberOfFloors"
            value={inputs.numberOfFloors || ""}
            onChange={handleChange}
            placeholder="e.g. 4"
            disabled={!isIncluded}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Building Height (Meters)
          </label>
          <input
            type="number"
            name="buildingHeightMeters"
            value={inputs.buildingHeightMeters || ""}
            onChange={handleChange}
            placeholder="e.g. 12"
            disabled={!isIncluded}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hazard / Occupancy Category
          </label>
          <select
            name="hazardLevel"
            value={inputs.hazardLevel || "LIGHT_HAZARD"}
            onChange={handleChange}
            disabled={!isIncluded}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="LIGHT_HAZARD">
              Light Hazard (Residential / Offices)
            </option>
            <option value="ORDINARY_HAZARD">
              Ordinary Hazard (Commercial / Malls)
            </option>
            <option value="HIGH_HAZARD">
              High Hazard (Industrial / Storage)
            </option>
          </select>
        </div>

        <div
          className={`flex items-center gap-2 mt-6 ${!isIncluded ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="checkbox"
            id="includeSprinklers"
            name="includeSprinklers"
            checked={inputs.includeSprinklers ?? true}
            onChange={handleChange}
            disabled={!isIncluded}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="includeSprinklers"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isIncluded ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            Include Automatic Sprinklers
          </label>
        </div>

        <div
          className={`flex items-center gap-2 mt-6 ${!isIncluded ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="checkbox"
            id="includeHydrants"
            name="includeHydrants"
            checked={inputs.includeHydrants ?? true}
            onChange={handleChange}
            disabled={!isIncluded}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 disabled:cursor-not-allowed"
          />
          <label
            htmlFor="includeHydrants"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isIncluded ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            Include Wet Risers & Hydrants
          </label>
        </div>
      </div>
    </div>
  );
};

export default FirefightingForm;
