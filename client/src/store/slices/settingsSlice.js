import { createSlice } from "@reduxjs/toolkit";

const savedSettings = JSON.parse(localStorage.getItem("settings"));

const initialState = savedSettings || {
  currency: "INR",
  unitSystem: "metric",
  theme: "light",
  region: "West Bengal",
  defaultConcreteGrade: "M20",
  rates: {
    cementPerBag: 350,
    steelPerKg: 58,
    brickPerUnit: 10,
    sandPerM3: 3000,
    aggregatePerM3: 1000,
  },
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

    setRegion: (state, action) => {
      state.region = action.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    setDefaultConcreteGrade: (state, action) => {
      state.defaultConcreteGrade = action.payload;
      localStorage.setItem("settings", JSON.stringify(state));
    },

    updateRates: (state, action) => {
      state.rates = {
        ...state.rates,
        ...action.payload,
      };
      localStorage.setItem("settings", JSON.stringify(state));
    },

    resetSettings: () => {
      localStorage.removeItem("settings");
      return initialState;
    },
  },
});

export const {
  setCurrency,
  setUnitSystem,
  setTheme,
  setRegion,
  setDefaultConcreteGrade,
  updateRates,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
