import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  inputs: {
    totalAreaSqM: 500,
    numberOfFloors: 4,
    buildingHeightMeters: 12,
    hazardLevel: "LIGHT_HAZARD",
    includeSprinklers: true,
    includeHydrants: true,
  },
  results: null,
  loading: false,
  error: null,
};

const firefightingSlice = createSlice({
  name: "firefighting",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleFirefightingIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateFirefightingInputs: (state, action) => {
      state.inputs = { ...state.inputs, ...action.payload };
    },
    setFirefightingResults: (state, action) => {
      state.results = action.payload;
    },
    resetFirefighting: () => initialState,
  },
});

export const {
  toggleFirefightingIncluded,
  updateFirefightingInputs,
  setFirefightingResults,
  resetFirefighting,
} = firefightingSlice.actions;

export default firefightingSlice.reducer;
