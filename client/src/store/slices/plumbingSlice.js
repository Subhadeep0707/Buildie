import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bathrooms: 0,
  kitchens: 0,
  balconies: 0,
};

const plumbingSlice = createSlice({
  name: "plumbing",
  initialState,
  reducers: {
    updatePlumbingInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPlumbingInputs: () => initialState,
  },
});

export const { updatePlumbingInputs, resetPlumbingInputs } =
  plumbingSlice.actions;
export default plumbingSlice.reducer;
