import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roofAreaSqM: "",
  annualRainfallMm: 1000,
  runoffCoefficient: 0.85,
  filterType: "mesh",
};

const rwhSlice = createSlice({
  name: "rwh",
  initialState,
  reducers: {
    updateRwhInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetRwhInputs: () => initialState,
  },
});

export const { updateRwhInputs, resetRwhInputs } = rwhSlice.actions;
export default rwhSlice.reducer;
