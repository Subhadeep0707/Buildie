import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaterialRates,
  verifyLiveSourceUrl,
} from "../../../store/slices/rateSlice";

const MaterialRates = () => {
  const dispatch = useDispatch();
  const { materials, loading, liveVerificationUrl } = useSelector(
    (state) => state.rates,
  );
  const [selectedCity, setSelectedCity] = useState("Kolkata");

  useEffect(() => {
    dispatch(fetchMaterialRates(selectedCity));
    dispatch(verifyLiveSourceUrl(selectedCity));
  }, [dispatch, selectedCity]);

  const inputStyle = `
    border
    border-gray-300
    dark:border-gray-600
    bg-white
    dark:bg-gray-700
    text-black
    dark:text-white
    rounded-lg
    p-2
    w-full
  `;

  const labelStyle = `
    text-sm
    text-gray-600
    dark:text-gray-300
    mb-1
  `;

  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        p-5
        rounded-xl
        shadow
        space-y-5
      "
    >
      {/* Header & Live Verification Link */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-xl dark:text-white">
            Regional & Market Rates
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Dynamic City-Wise Pricing
          </span>
        </div>

        <a
          href={liveVerificationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition inline-flex items-center gap-1.5"
        >
          🔍 Verify Live Rates on InfraLens
        </a>
      </div>

      {/* City Selection */}
      <div className="flex flex-col">
        <label className={labelStyle}>Select City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={inputStyle}
        >
          <option value="Kolkata">Kolkata</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
        </select>
      </div>

      {/* Materials Table Display */}
      {loading ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          Loading live rates from database...
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium text-gray-500">
                  Material
                </th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-500">
                  Brand
                </th>
                <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                  Min (₹)
                </th>
                <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                  Max (₹)
                </th>
                <th className="px-4 py-2.5 text-right font-medium text-gray-500">
                  Avg Benchmark
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {materials && materials.length > 0 ? (
                materials.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-gray-500">{item.brand}</td>
                    <td className="px-4 py-3 text-right">₹{item.minPrice}</td>
                    <td className="px-4 py-3 text-right">₹{item.maxPrice}</td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                      ₹{item.avgPrice} / {item.unit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No material rates found for {selectedCity}. (Add records via
                    Postman or seed script)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MaterialRates;
