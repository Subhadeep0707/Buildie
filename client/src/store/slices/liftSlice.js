import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  capacityPassengers: 6,
  stops: 4,
  standardKey: "IS_14665",
  typeKey: "passengerMRL",
};

const liftSlice = createSlice({
  name: "lift",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleLiftIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateLiftInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetLiftInputs: () => initialState,
  },
});

export const { toggleLiftIncluded, updateLiftInputs, resetLiftInputs } =
  liftSlice.actions;
export default liftSlice.reducer;
