import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  systemCapacityKw: "",
  roofAreaSqM: "",
  costPerKwINR: 50000, // Standard default benchmark cost
};

const solarSlice = createSlice({
  name: "solar",
  initialState,
  reducers: {
    updateSolarInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSolarInputs: () => initialState,
  },
});

export const { updateSolarInputs, resetSolarInputs } = solarSlice.actions;
export default solarSlice.reducer;
