import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  standardKey: "IS_9079",
  typeKey: "residentialTransfer",
  pumpRunningHours: 2,
  explicitHeadMeters: "",
  explicitDemandLiters: "",
  explicitRoomAreaSqM: "",
};

const pumpSlice = createSlice({
  name: "pump",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    togglePumpIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updatePumpInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPumpInputs: () => initialState,
  },
});

export const { togglePumpIncluded, updatePumpInputs, resetPumpInputs } =
  pumpSlice.actions;
export default pumpSlice.reducer;
