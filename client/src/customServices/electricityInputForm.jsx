import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateElectricityInputs,
  toggleElectricityIncluded,
} from "../store/slices/electricitySlice";

const ElectricityInputForm = () => {
  const dispatch = useDispatch();
  const electricity = useSelector((state) => state.electricity);

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && Number(value) < 0) return;
    dispatch(
      updateElectricityInputs({ [name]: value === "" ? "" : Number(value) }),
    );
  };

  const handleToggle = (e) => {
    dispatch(toggleElectricityIncluded(e.target.checked));
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      {/* Header & Simple Checkbox */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold dark:text-white">
          Electrical Estimation (IS 4648)
        </h3>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={electricity.isIncluded || false}
            onChange={handleToggle}
            className="w-4 h-4 cursor-pointer"
          />
          <span>Include Electricity</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            min="0"
            onKeyDown={blockInvalidChars}
            value={electricity.bedrooms === 0 ? "" : electricity.bedrooms}
            onChange={handleChange}
            placeholder="e.g. 3"
            disabled={!electricity.isIncluded}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Living / Common Rooms
          </label>
          <input
            type="number"
            name="livingRooms"
            min="0"
            onKeyDown={blockInvalidChars}
            value={electricity.livingRooms === 0 ? "" : electricity.livingRooms}
            onChange={handleChange}
            placeholder="e.g. 1"
            disabled={!electricity.isIncluded}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kitchens
          </label>
          <input
            type="number"
            name="kitchens"
            min="0"
            onKeyDown={blockInvalidChars}
            value={electricity.kitchens === 0 ? "" : electricity.kitchens}
            onChange={handleChange}
            placeholder="e.g. 1"
            disabled={!electricity.isIncluded}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            min="0"
            onKeyDown={blockInvalidChars}
            value={electricity.bathrooms === 0 ? "" : electricity.bathrooms}
            onChange={handleChange}
            placeholder="e.g. 2"
            disabled={!electricity.isIncluded}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectricityInputForm;
