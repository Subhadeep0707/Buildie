import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bedrooms: 0,
  livingRooms: 0,
  kitchens: 0,
  bathrooms: 0,
};

const electricitySlice = createSlice({
  name: "electricity",
  initialState,
  reducers: {
    updateElectricityInputs: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetElectricityInputs: () => initialState,
  },
});

export const { updateElectricityInputs, resetElectricityInputs } =
  electricitySlice.actions;
export default electricitySlice.reducer;
