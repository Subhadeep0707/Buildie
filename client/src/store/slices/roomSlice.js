import { createSlice } from "@reduxjs/toolkit";

//  Area-based defaults instead of nested rooms
const defaultFloor = {
  id: Date.now(),
  name: "Ground Floor",
  area: 80,
  height: 3,
  wallThickness: 0.23,
  slabThickness: 0.15,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    floors: [{ ...defaultFloor, id: Date.now() }],
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
        area: 80,
        height: 3,
        wallThickness: 0.23,
        slabThickness: 0.15,
      });
    },

    removeFloor: (state, action) => {
      state.floors = state.floors.filter((_, i) => i !== action.payload);
    },

    updateFloorName: (state, action) => {
      const { floorIndex, name } = action.payload;
      state.floors[floorIndex].name = name;
    },

    //  Handles updating area, height, wallThickness.
    updateFloor: (state, action) => {
      const { floorIndex, field, value } = action.payload;
      if (state.floors[floorIndex]) {
        state.floors[floorIndex][field] = value;
      }
    },

    setFloors: (state, action) => {
      state.floors = action.payload;
    },

    resetRooms: (state) => {
      state.floors = [{ ...defaultFloor, id: Date.now() }];
    },
  },
});

export const {
  addFloor,
  removeFloor,
  updateFloorName,
  updateFloor,
  setFloors,
  resetRooms,
} = roomSlice.actions;

export default roomSlice.reducer;
