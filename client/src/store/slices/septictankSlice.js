import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  septicUserCount: 5,
};

const septictankSlice = createSlice({
  name: "septictank",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleSepticIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateSepticInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSepticInputs: () => initialState,
  },
});

export const { toggleSepticIncluded, updateSepticInputs, resetSepticInputs } =
  septictankSlice.actions;
export default septictankSlice.reducer;
