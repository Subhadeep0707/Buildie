import React from "react";
const OpeningBreakdown = ({ roomData }) => {
  // SAFE FALLBACKS
  const details = roomData?.details || [];
  const totals = roomData?.totals || {
    brickVolume: 0,
    plasterArea: 0,
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
      {/* Heading & Summary Badge */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Space & Openings Analysis
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Detailed deduction breakdown per room
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
          {details.length} Configured Spaces
        </div>
      </div>

      {/* Grid of Room Cards */}
      {details.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {details.map((room, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-[#232734] border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              {/* Room Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 capitalize truncate">
                  {room.name || `Room ${i + 1}`}
                </h3>
                <span className="text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                  Space {i + 1}
                </span>
              </div>

              {/* Math Breakdown */}
              <div className="space-y-3 text-sm mt-4">
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 gap-2">
                  <span>Gross Wall Area:</span>
                  <span className="whitespace-nowrap">
                    {(room.wallArea || 0).toFixed(2)} m²
                  </span>
                </div>

                <div className="flex justify-between items-center text-red-600 dark:text-red-400 font-medium gap-2">
                  <span>- Openings:</span>
                  <span className="whitespace-nowrap">
                    {(room.openingArea || 0).toFixed(2)} m²
                  </span>
                </div>

                <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center font-bold text-gray-900 dark:text-white gap-2">
                  <span>Net Brick Area:</span>
                  <span className="text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {(room.netArea || 0).toFixed(2)} m²
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 dark:bg-[#232734] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No rooms added yet. Go to "Rooms &amp; Openings" to configure your
            floorplan.
          </p>
        </div>
      )}

      {/* Grand Totals Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mt-6">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-wider text-xs">
          Total Material Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1a1d27] p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/50 flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Brick Volume:
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {(totals.brickVolume || 0).toFixed(2)}{" "}
              <span className="text-sm text-gray-500">m³</span>
            </span>
          </div>

          <div className="bg-white dark:bg-[#1a1d27] p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800/50 flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Plaster Area:
            </span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              {(totals.plasterArea || 0).toFixed(2)}{" "}
              <span className="text-sm text-gray-500">m²</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningBreakdown;
