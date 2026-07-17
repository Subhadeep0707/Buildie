import { createSlice } from "@reduxjs/toolkit";

const defaultRoom = {
  length: 4,
  width: 3,
  height: 3,
  wallThickness: 0.23,
  openings: [],
  plasterSides: 2,
};

const defaultFloor = {
  id: Date.now(),
  name: "Ground Floor",
  rooms: [defaultRoom],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    floors: [defaultFloor],
  },

  reducers: {
    // FLOOR ACTIONS
    addFloor: (state) => {
      state.floors.push({
        id: Date.now(),
        name:
          state.floors.length === 1
            ? "First Floor"
            : `Floor ${state.floors.length}`,
        rooms: [{ ...defaultRoom }],
      });
    },

    removeFloor: (state, action) => {
      state.floors = state.floors.filter((_, i) => i !== action.payload);
    },

    updateFloorName: (state, action) => {
      const { floorIndex, name } = action.payload;
      state.floors[floorIndex].name = name;
    },

    setFloors: (state, action) => {
      state.floors = action.payload;
    },

    // ROOM ACTIONS
    addRoom: (state, action) => {
      const floorIndex = action.payload;
      state.floors[floorIndex].rooms.push({
        ...defaultRoom,
      });
    },

    removeRoom: (state, action) => {
      const { floorIndex, roomIndex } = action.payload;
      state.floors[floorIndex].rooms = state.floors[floorIndex].rooms.filter(
        (_, i) => i !== roomIndex,
      );
    },

    updateRoom: (state, action) => {
      const { floorIndex, roomIndex, updatedRoom } = action.payload;
      state.floors[floorIndex].rooms[roomIndex] = updatedRoom;
    },

    resetRooms: (state) => {
      state.floors = [defaultFloor];
    },
  },
});

export const {
  addFloor,
  removeFloor,
  updateFloorName,
  setFloors,
  addRoom,
  removeRoom,
  updateRoom,
  resetRooms,
} = roomSlice.actions;

export default roomSlice.reducer;
