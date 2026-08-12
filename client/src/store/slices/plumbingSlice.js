import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, // Master toggle to enable/disable Plumbing
  bathrooms: 0,
  kitchens: 0,
  balconies: 0,
};

const plumbingSlice = createSlice({
  name: "plumbing",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    togglePlumbingIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updatePlumbingInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPlumbingInputs: () => initialState,
  },
});

export const {
  togglePlumbingIncluded,
  updatePlumbingInputs,
  resetPlumbingInputs,
} = plumbingSlice.actions;

export default plumbingSlice.reducer;
