import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
  updateFirefightingInputs,
  setFirefightingResults,
  resetFirefighting,
} = firefightingSlice.actions;

export default firefightingSlice.reducer;
