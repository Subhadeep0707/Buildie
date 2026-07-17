import { useState } from "react";
import { regionRates } from "../../../constants/regionRates";

const MaterialRates = ({ rates, setRates }) => {
  const [selectedRegion, setSelectedRegion] = useState("West Bengal");

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setRates(regionRates[region]);
  };

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl dark:text-white">
          Regional & Custom Rates
        </h3>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Material Pricing
        </span>
      </div>

      {/* Region */}
      <div className="flex flex-col">
        <label className={labelStyle}>Select Region</label>
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className={inputStyle}
        >
          {Object.keys(regionRates).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* Rate Inputs */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Cement */}
        <div className="flex flex-col">
          <label className={labelStyle}>Cement Rate (₹ / bag)</label>
          <input
            type="number"
            value={rates.cementPerBag}
            onChange={(e) =>
              setRates({
                ...rates,
                cementPerBag: Number(e.target.value),
              })
            }
            className={inputStyle}
          />
        </div>

        {/* Steel */}
        <div className="flex flex-col">
          <label className={labelStyle}>Steel Rate (₹ / kg)</label>
          <input
            type="number"
            value={rates.steelPerKg}
            onChange={(e) =>
              setRates({
                ...rates,
                steelPerKg: Number(e.target.value),
              })
            }
            className={inputStyle}
          />
        </div>

        {/* Brick */}
        <div className="flex flex-col">
          <label className={labelStyle}>Brick Rate (₹ / unit)</label>
          <input
            type="number"
            value={rates.brickPerUnit}
            onChange={(e) =>
              setRates({
                ...rates,
                brickPerUnit: Number(e.target.value),
              })
            }
            className={inputStyle}
          />
        </div>

        {/* Sand */}
        <div className="flex flex-col">
          <label className={labelStyle}>Sand Rate (₹ / m³)</label>
          <input
            type="number"
            value={rates.sandPerM3}
            onChange={(e) =>
              setRates({
                ...rates,
                sandPerM3: Number(e.target.value),
              })
            }
            className={inputStyle}
          />
        </div>

        {/* Aggregate */}
        <div className="flex flex-col md:col-span-2">
          <label className={labelStyle}>Aggregate Rate (₹ / m³)</label>
          <input
            type="number"
            value={rates.aggregatePerM3}
            onChange={(e) =>
              setRates({
                ...rates,
                aggregatePerM3: Number(e.target.value),
              })
            }
            className={inputStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialRates;
