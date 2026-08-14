import React from "react";
import { useProjectSettings } from "../../../store/slices/useProjectSettings"; 

const OpeningBreakdown = ({ floorData }) => {
  const { units } = useProjectSettings(); // Grab dynamic units
  const details = floorData?.details || [];
  const totals = floorData?.totals || {
    brickVolume: 0,
    plasterArea: 0,
    slabVolume: 0,
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Floor Analysis Breakdown
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Core material volumes generated per floor via API
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
          {details.length} Floors Calculated
        </div>
      </div>

      {details.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {details.map((floor, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-[#232734] border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 capitalize truncate">
                  {floor.name || `Floor ${i + 1}`}
                </h3>
                <span className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                  {floor.floorArea > 0 ? `${floor.floorArea} ${units.area}` : "Empty"}
                </span>
              </div>

              <div className="space-y-3 text-sm mt-4">
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 gap-2">
                  <span>Slab Concrete:</span>
                  <span className="whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                    {(floor.slabVolume || 0).toFixed(2)} {units.volume}
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 gap-2">
                  <span>Plaster Area:</span>
                  <span className="whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                    {(floor.plasterArea || 0).toFixed(2)} {units.area}
                  </span>
                </div>

                <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center font-bold text-gray-900 dark:text-white gap-2">
                  <span>Brickwork Volume:</span>
                  <span className="text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {(floor.brickVolume || 0).toFixed(2)} {units.volume}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 dark:bg-[#232734] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            Awaiting API data. Configure your floors and click{" "}
            <strong>Calculate</strong> to view the breakdown.
          </p>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mt-6">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider text-xs">
          Total Structure Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1a1d27] p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase mb-1">
              Total Concrete
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {(totals.slabVolume || 0).toFixed(2)}{" "}
              <span className="text-xs text-gray-500 font-normal">{units.volume}</span>
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a1d27] p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase mb-1">
              Total Brickwork
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {(totals.brickVolume || 0).toFixed(2)}{" "}
              <span className="text-xs text-gray-500 font-normal">{units.volume}</span>
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a1d27] p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/50 flex flex-col justify-center">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase mb-1">
              Total Plaster
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {(totals.plasterArea || 0).toFixed(2)}{" "}
              <span className="text-xs text-gray-500 font-normal">{units.area}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningBreakdown;
