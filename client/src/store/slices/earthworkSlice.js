import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  type: "isolatedFooting",
  numberOfFootings: 6,
  footingLength: 1.5,
  footingWidth: 1.5,
  customDepth: 1.5,
  stripLengthMeters: 10,
};

const earthworkSlice = createSlice({
  name: "earthwork",
  initialState,
  reducers: {
    updateEarthworkInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetEarthworkInputs: () => initialState,
  },
});

export const { updateEarthworkInputs, resetEarthworkInputs } =
  earthworkSlice.actions;
export default earthworkSlice.reducer;
