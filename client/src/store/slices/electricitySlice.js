import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isIncluded: false, 
  bedrooms: 0,
  livingRooms: 0,
  kitchens: 0,
  bathrooms: 0,
};

const electricitySlice = createSlice({
  name: "electricity",
  initialState,
  reducers: {
    // Action to flip the switch ON/OFF
    toggleElectricityIncluded: (state, action) => {
      state.isIncluded = action.payload;
    },
    updateElectricityInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetElectricityInputs: () => initialState,
  },
});

export const {
  toggleElectricityIncluded,
  updateElectricityInputs,
  resetElectricityInputs,
} = electricitySlice.actions;

export default electricitySlice.reducer;
