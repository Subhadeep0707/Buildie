import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  septicUserCount: 5,
};

const septictankSlice = createSlice({
  name: "septictank",
  initialState,
  reducers: {
    updateSepticInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSepticInputs: () => initialState,
  },
});

export const { updateSepticInputs, resetSepticInputs } = septictankSlice.actions;
export default septictankSlice.reducer;