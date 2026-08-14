import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaterialRates,
  verifyLiveSourceUrl,
  saveCustomRates,
} from "../../../store/slices/rateSlice";

const MaterialRates = () => {
  const dispatch = useDispatch();
  const { materials, loading, liveVerificationUrl } = useSelector(
    (state) => state.rates,
  );
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [isEditing, setIsEditing] = useState(false);
  const [localRates, setLocalRates] = useState([]);

  useEffect(() => {
    dispatch(fetchMaterialRates(selectedCity));
    dispatch(verifyLiveSourceUrl(selectedCity));
  }, [dispatch, selectedCity]);

  useEffect(() => {
    if (materials) {
      setLocalRates(JSON.parse(JSON.stringify(materials)));
    }
  }, [materials]);

  const handleInputChange = (index, field, value) => {
    const updatedRates = [...localRates];
    // Ensure numbers for prices, strings for text
    updatedRates[index][field] =
      field === "minPrice" || field === "maxPrice" ? Number(value) : value;

    // Auto-calculate average dynamically
    if (field === "minPrice" || field === "maxPrice") {
      const min = updatedRates[index].minPrice || 0;
      const max = updatedRates[index].maxPrice || 0;
      updatedRates[index].avgPrice = Math.round((min + max) / 2);
    }

    setLocalRates(updatedRates);
  };

  const handleAddRow = () => {
    setLocalRates([
      ...localRates,
      {
        name: "",
        brand: "",
        category: "Other", // Default schema requirement
        unit: "bag", // Default schema requirement
        city: selectedCity,
        minPrice: 0,
        maxPrice: 0,
        avgPrice: 0,
        isNewRow: true, // UI flag to allow editing Name and Brand
      },
    ]);
  };

  const handleSaveRates = async () => {
    // Filter out completely empty rows before saving
    const validRates = localRates.filter((rate) => rate.name.trim() !== "");
    await dispatch(saveCustomRates(validRates));
    setIsEditing(false);
    dispatch(fetchMaterialRates(selectedCity));
  };

  const inputStyle = `
    border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
    text-black dark:text-white rounded-lg p-2 w-full
  `;

  const labelStyle = `
    text-sm text-gray-600 dark:text-gray-300 mb-1
  `;

  const numberInputStyle = `
    w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white text-right
  `;

  const textInputStyle = `
    w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white text-left
  `;

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow space-y-5">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-xl dark:text-white">
            Regional & Market Rates
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Dynamic City-Wise Pricing
          </span>
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
            >
               Edit Custom Rates
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setLocalRates(materials); 
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRates}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
              >
                 Save Rates
              </button>
            </>
          )}

          <a
            href={liveVerificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition inline-flex items-center gap-1.5"
          >
             Verify Live Rates
          </a>
        </div>
      </div>

      {/*  Dynamic City Selection */}
      <div className="flex flex-col">
        <label className={labelStyle}>Select or Type a City</label>
        <input
          type="text"
          list="city-options"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={inputStyle}
          disabled={isEditing}
          placeholder="e.g. Mumbai, Paschim Medinipur..."
        />
        <datalist id="city-options">
          <option value="Kolkata" />
          <option value="Mumbai" />
          <option value="Bangalore" />
          <option value="Delhi" />
        </datalist>
      </div>

      {/* Data Table */}
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
              {localRates && localRates.length > 0
                ? localRates.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {/* Material Name */}
                      <td className="px-4 py-3 font-medium">
                        {isEditing && item.isNewRow ? (
                          <input
                            type="text"
                            placeholder="e.g. OPC 53 Grade Cement"
                            value={item.name}
                            onChange={(e) =>
                              handleInputChange(index, "name", e.target.value)
                            }
                            className={textInputStyle}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            {item.name}
                            {item.userId && (
                              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                                Custom
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Brand */}
                      <td className="px-4 py-3 text-gray-500">
                        {isEditing && item.isNewRow ? (
                          <input
                            type="text"
                            placeholder="e.g. UltraTech"
                            value={item.brand}
                            onChange={(e) =>
                              handleInputChange(index, "brand", e.target.value)
                            }
                            className={textInputStyle}
                          />
                        ) : (
                          item.brand
                        )}
                      </td>

                      {/* Editable Min Price */}
                      <td className="px-4 py-3 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            value={item.minPrice}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "minPrice",
                                e.target.value,
                              )
                            }
                            className={numberInputStyle}
                          />
                        ) : (
                          `₹${item.minPrice}`
                        )}
                      </td>

                      {/* Editable Max Price */}
                      <td className="px-4 py-3 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            value={item.maxPrice}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "maxPrice",
                                e.target.value,
                              )
                            }
                            className={numberInputStyle}
                          />
                        ) : (
                          `₹${item.maxPrice}`
                        )}
                      </td>

                      {/* Unit Selection & Avg Price */}
                      <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                        <div className="flex items-center justify-end gap-1.5">
                          ₹{item.avgPrice} /
                          {isEditing && item.isNewRow ? (
                            <select
                              value={item.unit}
                              onChange={(e) =>
                                handleInputChange(index, "unit", e.target.value)
                              }
                              className="p-1 border rounded text-xs dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="kg">kg</option>
                              <option value="ton">ton</option>
                              <option value="bag">bag</option>
                              <option value="cft">cft</option>
                              <option value="sqft">sqft</option>
                              <option value="nos">nos</option>
                            </select>
                          ) : (
                            item.unit
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : !isEditing && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No materials found for {selectedCity}. Click "Edit
                        Custom Rates" to add one!
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>

          {/* NEW: Add Row Button visible only during Edit Mode */}
          {isEditing && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-center">
              <button
                onClick={handleAddRow}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 transition"
              >
                Add New Material to {selectedCity}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialRates;
