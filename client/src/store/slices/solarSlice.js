import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  systemCapacityKw: "",
  roofAreaSqM: "",
  costPerKwINR: 50000,
};

const solarSlice = createSlice({
  name: "solar",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleSolarIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateSolarInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSolarInputs: () => initialState,
  },
});

export const { toggleSolarIncluded, updateSolarInputs, resetSolarInputs } =
  solarSlice.actions;
export default solarSlice.reducer;
