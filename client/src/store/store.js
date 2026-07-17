import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";
import rateReducer from "./slices/rateSlice";
import projectReducer from "./slices/projectSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    rates: rateReducer,
    projects: projectReducer,
    settings: settingsReducer,
    auth: authReducer,
  },
});
