import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrency,
  setUnitSystem,
  setTheme,
} from "../store/slices/settingsSlice";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Currency */}
      <div className="bg-white dark:bg-[#232734] p-5 rounded shadow border border-gray-200 dark:border-gray-800">
        <label className="block mb-2 dark:text-gray-300 font-medium">
          Currency
        </label>
        <select
          value={settings.currency}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
          className="border p-3 rounded w-full bg-gray-50 dark:bg-[#1a1d27] dark:text-white dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
        >
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
          <option value="GBP">GBP £</option>
        </select>
      </div>

      {/* Unit System */}
      <div className="bg-white dark:bg-[#232734] p-5 rounded shadow border border-gray-200 dark:border-gray-800">
        <label className="block mb-2 dark:text-gray-300 font-medium">
          Unit System
        </label>
        <select
          value={settings.unitSystem}
          onChange={(e) => dispatch(setUnitSystem(e.target.value))}
          className="border p-3 rounded w-full bg-gray-50 dark:bg-[#1a1d27] dark:text-white dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
        >
          <option value="metric">Metric (m, mm, kg)</option>
          <option value="imperial">Imperial (ft, in, lbs)</option>
        </select>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-[#232734] p-5 rounded shadow border border-gray-200 dark:border-gray-800">
        <label className="block mb-2 dark:text-gray-300 font-medium">
          Theme
        </label>
        <select
          value={settings.theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          className="border p-3 rounded w-full bg-gray-50 dark:bg-[#1a1d27] dark:text-white dark:border-gray-700 focus:ring-1 focus:ring-blue-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsForm;
