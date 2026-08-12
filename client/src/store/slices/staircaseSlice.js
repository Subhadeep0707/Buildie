import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false,
  floorHeightM: 3.0,
  flightWidthM: 1.2,
  flightLengthM: 4.0,
  numberOfFloors: 1,
};

const staircaseSlice = createSlice({
  name: "staircase",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleStaircaseIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateStaircaseInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetStaircaseInputs: () => initialState,
  },
});

export const {
  toggleStaircaseIncluded,
  updateStaircaseInputs,
  resetStaircaseInputs,
} = staircaseSlice.actions;
export default staircaseSlice.reducer;
