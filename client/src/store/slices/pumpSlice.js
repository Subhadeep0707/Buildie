import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
    updatePumpInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPumpInputs: () => initialState,
  },
});

export const { updatePumpInputs, resetPumpInputs } = pumpSlice.actions;
export default pumpSlice.reducer;
