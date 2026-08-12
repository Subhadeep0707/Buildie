import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  roofAreaSqM: "",
  annualRainfallMm: 1000,
  runoffCoefficient: 0.85,
  filterType: "mesh",
};

const rwhSlice = createSlice({
  name: "rwh",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleRwhIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateRwhInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetRwhInputs: () => initialState,
  },
});

export const { toggleRwhIncluded, updateRwhInputs, resetRwhInputs } =
  rwhSlice.actions;
export default rwhSlice.reducer;
