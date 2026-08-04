import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  floorHeightM: 3.0,
  flightWidthM: 1.2,
  flightLengthM: 4.0,
  numberOfFloors: 1,
};

const staircaseSlice = createSlice({
  name: "staircase",
  initialState,
  reducers: {
    updateStaircaseInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetStaircaseInputs: () => initialState,
  },
});

export const { updateStaircaseInputs, resetStaircaseInputs } =
  staircaseSlice.actions;
export default staircaseSlice.reducer;
