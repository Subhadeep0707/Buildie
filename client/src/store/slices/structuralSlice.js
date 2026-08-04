import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columnHeightM: 3.0,
  columnWidthM: 0.3,
  columnDepthM: 0.3,
  beamWidthM: 0.23,
  beamDepthM: 0.375,
};

const structuralSlice = createSlice({
  name: "structural",
  initialState,
  reducers: {
    updateStructuralInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetStructuralInputs: () => initialState,
  },
});

export const { updateStructuralInputs, resetStructuralInputs } =
  structuralSlice.actions;
export default structuralSlice.reducer;
