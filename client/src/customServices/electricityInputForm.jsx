import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElectricityInputs } from "../store/slices/electricitySlice";

const ElectricityInputForm = () => {
  const dispatch = useDispatch();
  const electricity = useSelector((state) => state.electricity);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateElectricityInputs({ [name]: Number(value) || 0 }));
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold mb-4 dark:text-white">
        Electrical Estimation (IS 4648)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            min="0"
            value={electricity.bedrooms === 0 ? "" : electricity.bedrooms}
            onChange={handleChange}
            placeholder="e.g. 3"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={electricity.livingRooms === 0 ? "" : electricity.livingRooms}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={electricity.kitchens === 0 ? "" : electricity.kitchens}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={electricity.bathrooms === 0 ? "" : electricity.bathrooms}
            onChange={handleChange}
            placeholder="e.g. 2"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectricityInputForm;
