import { createSlice } from "@reduxjs/toolkit";

import { PRICES } from "../../constants/Prices";

const rateSlice = createSlice({
  name: "rates",

  initialState: {
    rates: PRICES,
  },

  reducers: {
    updateRates: (state, action) => {
      state.rates = {
        ...state.rates,
        ...action.payload,
      };
    },

    resetRates: (state) => {
      state.rates = PRICES;
    },
  },
});

export const { updateRates, resetRates } = rateSlice.actions;

export default rateSlice.reducer;
