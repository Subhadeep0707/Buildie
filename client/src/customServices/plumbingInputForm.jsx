import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlumbingInputs } from "../store/slices/plumbingSlice";

const PlumbingInputForm = () => {
  const dispatch = useDispatch();
  const plumbing = useSelector((state) => state.plumbing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePlumbingInputs({ [name]: Number(value) || 0 }));
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold mb-4 dark:text-white">
        Plumbing Estimation (IS 1172)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            min="0"
            value={plumbing.bathrooms === 0 ? "" : plumbing.bathrooms}
            onChange={handleChange}
            placeholder="e.g. 2"
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
            value={plumbing.kitchens === 0 ? "" : plumbing.kitchens}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Balconies / Utility
          </label>
          <input
            type="number"
            name="balconies"
            min="0"
            value={plumbing.balconies === 0 ? "" : plumbing.balconies}
            onChange={handleChange}
            placeholder="e.g. 1"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#232734] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PlumbingInputForm;
