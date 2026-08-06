import { createSlice } from "@reduxjs/toolkit";

const savedSettings = JSON.parse(localStorage.getItem("settings"));

const initialState = {
  currency: "INR",
  unitSystem: "metric",
  theme: "light",
  ...savedSettings,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    setUnitSystem: (state, action) => {
      state.unitSystem = action.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    resetSettings: () => {
      localStorage.removeItem("settings");
      return initialState;
    },
  },
});

export const { setCurrency, setUnitSystem, setTheme, resetSettings } =
  settingsSlice.actions;

export default settingsSlice.reducer;
