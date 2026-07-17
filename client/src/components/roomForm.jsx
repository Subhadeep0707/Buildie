import React from "react";

const RoomForm = ({ room, index, updateRoom, removeRoom }) => {
  const handleChange = (field, value) => {
    updateRoom(index, {
      ...room,
      [field]: value === "" ? "" : Number(value),
    });
  };

  const addOpening = () => {
    const updated = {
      ...room,
      openings: [
        ...room.openings,
        {
          width: 1,
          height: 1,
          type: "window",
        },
      ],
    };

    updateRoom(index, updated);
  };

  const updateOpening = (i, field, value) => {
    const updatedOpenings = room.openings.map((o, idx) =>
      idx === i
        ? {
            ...o,
            [field]:
              field === "type" ? value : value === "" ? "" : Number(value),
          }
        : o,
    );

    updateRoom(index, {
      ...room,
      openings: updatedOpenings,
    });
  };

  const removeOpening = (i) => {
    const updated = room.openings.filter((_, idx) => idx !== i);

    updateRoom(index, {
      ...room,
      openings: updated,
    });
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

  return (
    <div
      className="
        bg-gray-50
        dark:bg-gray-900
        border
        border-gray-200
        dark:border-gray-700
        rounded-xl
        p-5
        space-y-5
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg dark:text-white">
          Room {index + 1}
        </h3>

        <button
          onClick={() => {
            if (index !== 0) {
              removeRoom(index);
            }
          }}
          className="
            text-red-500
            hover:text-red-600
            text-sm
            font-medium
          "
        >
          Remove Room
        </button>
      </div>

      {/* Room Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Length"
          value={room.length || ""}
          onChange={(e) => handleChange("length", e.target.value)}
          className={inputStyle}
        />

        <input
          placeholder="Width"
          value={room.width || ""}
          onChange={(e) => handleChange("width", e.target.value)}
          className={inputStyle}
        />

        <input
          placeholder="Height"
          value={room.height || ""}
          onChange={(e) => handleChange("height", e.target.value)}
          className={inputStyle}
        />

        <input
          placeholder="Wall Thickness"
          value={room.wallThickness || ""}
          onChange={(e) => handleChange("wallThickness", e.target.value)}
          className={inputStyle}
        />
      </div>

      {/* Openings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold dark:text-gray-200">Openings</h4>

          <button
            onClick={addOpening}
            className="
              text-blue-600
              hover:text-blue-700
              text-sm
              font-medium
            "
          >
            + Add Opening
          </button>
        </div>

        {room.openings.map((op, i) => (
          <div
            key={i}
            className="
              grid
              grid-cols-3
              gap-3
              bg-white
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              rounded-lg
              p-3
            "
          >
            <select
              value={op.type}
              onChange={(e) => updateOpening(i, "type", e.target.value)}
              className={inputStyle}
            >
              <option value="door">Door</option>

              <option value="window">Window</option>
            </select>

            <input
              placeholder="Width"
              value={op.width || ""}
              onChange={(e) => updateOpening(i, "width", e.target.value)}
              className={inputStyle}
            />

            <input
              placeholder="Height"
              value={op.height || ""}
              onChange={(e) => updateOpening(i, "height", e.target.value)}
              className={inputStyle}
            />

            <button
              onClick={() => removeOpening(i)}
              className="
                col-span-3
                text-red-500
                hover:text-red-600
                text-sm
                font-medium
                text-left
              "
            >
              Remove Opening
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomForm;
