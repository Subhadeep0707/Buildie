import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  capacityPassengers: 6,
  stops: 4,
  standardKey: "IS_14665",
  typeKey: "passengerMRL",
};

const liftSlice = createSlice({
  name: "lift",
  initialState,
  reducers: {
    updateLiftInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetLiftInputs: () => initialState,
  },
});

export const { updateLiftInputs, resetLiftInputs } = liftSlice.actions;
export default liftSlice.reducer;
