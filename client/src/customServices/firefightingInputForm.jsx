import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFirefightingInputs,
  toggleFirefightingIncluded,
} from "../store/slices/firefightingSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const FirefightingForm = () => {
  const dispatch = useDispatch();
  const { inputs, isIncluded } = useSelector(
    (state) => state.firefighting || { inputs: {} },
  );
  const { units } = useProjectSettings();

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "number" && value !== "" && Number(value) < 0) return;

    dispatch(
      updateFirefightingInputs({
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
              ? value === ""
                ? ""
                : parseFloat(value) || 0
              : value,
      }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleFirefightingIncluded(e.target.checked));
  };

  return (
    <div className="w-full">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Total Built-up Area ({units.area})
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChars}
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
            min="0"
            onKeyDown={blockInvalidChars}
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
            Building Height ({units.length})
          </label>
          <input
            type="number"
            min="0"
            onKeyDown={blockInvalidChars}
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
