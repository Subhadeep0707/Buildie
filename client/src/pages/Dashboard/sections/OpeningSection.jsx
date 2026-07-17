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
    <div
      className="
        bg-white
        dark:bg-gray-800
        p-5
        rounded-xl
        shadow
        space-y-6
      "
    >
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          Multi Floor Openings
        </h2>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {floors.length} Floors
        </span>
      </div>

      {/* Floors */}
      <div className="space-y-6">
        {floors.map((floor, floorIndex) => (
          <div
            key={floor.id}
            className="
              border
              border-gray-200
              dark:border-gray-700
              rounded-xl
              p-4
              space-y-4
              bg-gray-50
              dark:bg-gray-900
            "
          >
            {/* Floor Header */}
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={floor.name}
                onChange={(e) => updateFloorName(floorIndex, e.target.value)}
                className="
                  border
                  p-2
                  rounded-lg
                  bg-white
                  dark:bg-gray-800
                  dark:text-white
                  dark:border-gray-600
                  flex-1
                "
              />

              <button
                onClick={() => {
                  if (floors.length > 1) {
                    removeFloor(floorIndex);
                  }
                }}
                className="
                  bg-red-600
                  hover:bg-red-700
                  transition
                  text-white
                  px-3
                  py-2
                  rounded-lg
                "
              >
                Remove Floor
              </button>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
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

            {/* Add Room */}
            <button
              onClick={() => addRoom(floorIndex)}
              className="
                bg-blue-600
                hover:bg-blue-700
                transition
                text-white
                px-4
                py-2
                rounded-lg
                font-medium
              "
            >
              + Add Room
            </button>
          </div>
        ))}
      </div>

      {/* Add Floor */}
      <button
        onClick={addFloor}
        className="
          bg-green-600
          hover:bg-green-700
          transition
          text-white
          px-5
          py-3
          rounded-lg
          font-semibold
        "
      >
        + Add Floor
      </button>
    </div>
  );
};

export default OpeningSection;
