import React from "react";
import { useProjectSettings } from "../store/slices/useProjectSettings";

const InputForm = ({ onCalculate, formData, setFormData }) => {
  const { symbol, units } = useProjectSettings();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md space-y-4 border border-gray-200 dark:border-gray-700"
    >
      <div>
        <h3 className="text-base font-bold text-gray-800 dark:text-white tracking-wide">
          Global Project Settings
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Active Currency: <span className="font-semibold">{symbol}</span> |
          Unit Scale: <span className="font-semibold">{units.length}</span>
        </p>
      </div>

      {/* Concrete Grade Selector */}
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
          Concrete Mix Grade
        </label>
        <select
          value={formData.grade}
          onChange={(e) =>
            setFormData({
              ...formData,
              grade: e.target.value,
            })
          }
          className="w-full border p-2.5 rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        >
          <option value="M15">M15 (1:2:4)</option>
          <option value="M20">M20 (1:1.5:3)</option>
          <option value="M25">M25 (1:1:2)</option>
        </select>
      </div>

      {/* Master Calculate Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-bold shadow-md text-sm cursor-pointer flex items-center justify-center gap-2"
      >
        <span>⚡</span> Run Full Estimate Calculation
      </button>
    </form>
  );
};

export default InputForm;
