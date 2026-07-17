const OpeningBreakdown = ({ roomData }) => {
  // SAFE FALLBACKS
  const details = roomData?.details || [];
  const totals = roomData?.totals || {
    brickVolume: 0,
    plasterArea: 0,
  };

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
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          Openings Breakdown
        </h2>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {details.length} Rooms
        </span>
      </div>

      {/* Room Cards */}
      <div className="space-y-4">
        {details.map((room, i) => (
          <div
            key={i}
            className="
              bg-gray-50
              dark:bg-gray-900
              border
              border-gray-200
              dark:border-gray-700
              rounded-xl
              p-4
              space-y-2
            "
          >
            <h3 className="font-semibold text-lg dark:text-white">
              Room {i + 1}
            </h3>

            <p className="text-gray-700 dark:text-gray-300">
              Wall Area: {(room.wallArea || 0).toFixed(2)} m²
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Openings: {(room.openingArea || 0).toFixed(2)} m²
            </p>

            <p className="font-bold text-green-700 dark:text-green-300">
              Net Area: {(room.netArea || 0).toFixed(2)} m²
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div
        className="
          bg-green-100
          dark:bg-green-900/30
          border
          border-green-300
          dark:border-green-700
          rounded-xl
          p-4
          space-y-2
        "
      >
        <h3 className="font-semibold text-lg dark:text-white">Totals</h3>

        <p className="dark:text-gray-200">
          Total Brick Volume: {(totals.brickVolume || 0).toFixed(2)} m³
        </p>

        <p className="dark:text-gray-200">
          Total Plaster Area: {(totals.plasterArea || 0).toFixed(2)} m²
        </p>
      </div>
    </div>
  );
};

export default OpeningBreakdown;
