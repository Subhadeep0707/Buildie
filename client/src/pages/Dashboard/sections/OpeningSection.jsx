import RoomForm from "../../../components/roomForm";
const OpeningSection = ({
  floors,
  updateRoom,
  removeRoom,
  addRoom,
  addFloor,
  removeFloor,
  updateFloorName,
}) => {
  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Multi-Floor Configuration
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Design your floorplan and assign rooms
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
          {floors.length} Floors Configured
        </div>
      </div>

      {/* Floors List */}
      <div className="space-y-6">
        {floors.map((floor, floorIndex) => (
          <div
            key={floor.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-5 bg-gray-50 dark:bg-[#232734]"
          >
            {/* Floor Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Floor {floorIndex + 1}
                </span>
                <input
                  type="text"
                  value={floor.name}
                  onChange={(e) => updateFloorName(floorIndex, e.target.value)}
                  placeholder="e.g., Ground Floor"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>

              <button
                onClick={() => {
                  if (floors.length > 1) {
                    removeFloor(floorIndex);
                  }
                }}
                disabled={floors.length <= 1}
                className={`transition px-4 py-2 rounded-lg text-sm font-semibold ${
                  floors.length > 1
                    ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                Remove Floor
              </button>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              {floor.rooms.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic text-center py-4">
                  No rooms added to this floor yet.
                </p>
              )}
              {floor.rooms.map((room, roomIndex) => (
                <RoomForm
                  key={roomIndex}
                  room={room}
                  index={roomIndex}
                  updateRoom={(roomIndex, updatedRoom) =>
                    updateRoom(floorIndex, roomIndex, updatedRoom)
                  }
                  removeRoom={(roomIndex) => removeRoom(floorIndex, roomIndex)}
                />
              ))}
            </div>

            {/* Add Room Button */}
            <div className="pt-2">
              <button
                onClick={() => addRoom(floorIndex)}
                className="w-full sm:w-auto bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span>+</span> Add Room to{" "}
                {floor.name || `Floor ${floorIndex + 1}`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Floor Button */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={addFloor}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-lg font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>+</span> Add New Floor
        </button>
      </div>
    </div>
  );
};

export default OpeningSection;
