import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plasterStandardKey: "IS_1661",
  paintStandardKey: "IS_2395",
  tileStandardKey: "IS_1443",
  customTileLength: 0.6,
  customTileWidth: 0.6,
};

const finishingSlice = createSlice({
  name: "finishing",
  initialState,
  reducers: {
    updateFinishingInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFinishingInputs: () => initialState,
  },
});

export const { updateFinishingInputs, resetFinishingInputs } =
  finishingSlice.actions;
export default finishingSlice.reducer;
