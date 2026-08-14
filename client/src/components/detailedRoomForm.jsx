import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDetailedRoom,
  removeDetailedRoom,
  updateDetailedRoom,
  resetDetailedRooms,
} from "../store/slices/detailedRoomSlice";
import { useProjectSettings } from "../store/slices/useProjectSettings"; 

const DetailedRoomForm = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.detailedRooms.rooms);
  const { units } = useProjectSettings();

  const handleUpdateRoom = (index, updatedRoom) => {
    dispatch(updateDetailedRoom({ index, updatedRoom }));
  };

  const handleItemChange = (roomIndex, itemIndex, type, field, value) => {
    if (value !== "" && Number(value) < 0) return;

    const room = rooms[roomIndex];
    const newItems = [...(room[type] || [])];
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      [field]: value === "" ? "" : Number(value),
    };
    handleUpdateRoom(roomIndex, { ...room, [type]: newItems });
  };

  const addItem = (roomIndex, type) => {
    const room = rooms[roomIndex];
    handleUpdateRoom(roomIndex, {
      ...room,
      [type]: [...(room[type] || []), { width: "", height: "" }],
    });
  };

  const removeItem = (roomIndex, itemIndex, type) => {
    const room = rooms[roomIndex];
    handleUpdateRoom(roomIndex, {
      ...room,
      [type]: room[type].filter((_, i) => i !== itemIndex),
    });
  };

  const blockInvalidChars = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1d27] p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
            Detailed Room-by-Room Design
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure custom dimensions, doors, and windows per room
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(resetDetailedRooms())}
            className="text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 font-semibold transition cursor-pointer px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            Reset Form
          </button>
          <div className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-200 dark:border-indigo-800">
            {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"} Configured
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {rooms.map((room, roomIndex) => (
          <div
            key={roomIndex}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-5 bg-gray-50 dark:bg-[#232734]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1 flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  #{roomIndex + 1}
                </span>
                <input
                  type="text"
                  value={room.name || ""}
                  onChange={(e) =>
                    handleUpdateRoom(roomIndex, {
                      ...room,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter Room Name (e.g., Master Bedroom)"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-[#1a1d27] dark:text-white flex-1 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm transition-all"
                />
              </div>

              <button
                onClick={() => dispatch(removeDetailedRoom(roomIndex))}
                disabled={rooms.length <= 1}
                className={`transition px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  rooms.length > 1
                    ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 cursor-pointer"
                    : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                Delete Room
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["length", "width", "height", "wallThickness"].map((field) => (
                <div key={field}>
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1 font-semibold uppercase tracking-wide">
                    {field === "wallThickness" ? "Wall Thick" : field} (
                    {units.length})
                  </label>
                  <input
                    type="number"
                    min="0"
                    onKeyDown={blockInvalidChars}
                    value={room[field]}
                    onChange={(e) => {
                      if (e.target.value !== "" && Number(e.target.value) < 0)
                        return;
                      handleUpdateRoom(roomIndex, {
                        ...room,
                        [field]:
                          e.target.value === "" ? "" : Number(e.target.value),
                      });
                    }}
                    placeholder={
                      field === "wallThickness"
                        ? "0.23"
                        : field === "height"
                          ? "3.0"
                          : "0.0"
                    }
                    className="w-full bg-white dark:bg-[#1a1d27] border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-gray-200 dark:border-gray-700/50">
              <div className="bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Doors
                  </span>
                  <button
                    onClick={() => addItem(roomIndex, "doors")}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                  >
                    + Add Door
                  </button>
                </div>
                <div className="space-y-3">
                  {room.doors?.map((door, opIndex) => (
                    <div
                      key={`door-${opIndex}`}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="number"
                        min="0"
                        onKeyDown={blockInvalidChars}
                        placeholder={`Width (${units.length})`}
                        value={door.width}
                        onChange={(e) =>
                          handleItemChange(
                            roomIndex,
                            opIndex,
                            "doors",
                            "width",
                            e.target.value,
                          )
                        }
                        className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-[#232734] text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-gray-400 text-xs font-medium shrink-0">
                        ×
                      </span>
                      <input
                        type="number"
                        min="0"
                        onKeyDown={blockInvalidChars}
                        placeholder={`Height (${units.length})`}
                        value={door.height}
                        onChange={(e) =>
                          handleItemChange(
                            roomIndex,
                            opIndex,
                            "doors",
                            "height",
                            e.target.value,
                          )
                        }
                        className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-[#232734] text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() => removeItem(roomIndex, opIndex, "doors")}
                        className="shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-1.5 rounded transition-colors cursor-pointer flex items-center justify-center w-8 h-8"
                        title="Remove Door"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Windows
                  </span>
                  <button
                    onClick={() => addItem(roomIndex, "windows")}
                    className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                  >
                    + Add Window
                  </button>
                </div>
                <div className="space-y-3">
                  {room.windows?.map((window, opIndex) => (
                    <div
                      key={`win-${opIndex}`}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="number"
                        min="0"
                        onKeyDown={blockInvalidChars}
                        placeholder={`Width (${units.length})`}
                        value={window.width}
                        onChange={(e) =>
                          handleItemChange(
                            roomIndex,
                            opIndex,
                            "windows",
                            "width",
                            e.target.value,
                          )
                        }
                        className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-[#232734] text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <span className="text-gray-400 text-xs font-medium shrink-0">
                        ×
                      </span>
                      <input
                        type="number"
                        min="0"
                        onKeyDown={blockInvalidChars}
                        placeholder={`Height (${units.length})`}
                        value={window.height}
                        onChange={(e) =>
                          handleItemChange(
                            roomIndex,
                            opIndex,
                            "windows",
                            "height",
                            e.target.value,
                          )
                        }
                        className="flex-1 min-w-0 border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-[#232734] text-xs text-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() =>
                          removeItem(roomIndex, opIndex, "windows")
                        }
                        className="shrink-0 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-1.5 rounded transition-colors cursor-pointer flex items-center justify-center w-8 h-8"
                        title="Remove Window"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => dispatch(addDetailedRoom())}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span>+</span> Add Another Room
        </button>
      </div>
    </div>
  );
};

export default DetailedRoomForm;
