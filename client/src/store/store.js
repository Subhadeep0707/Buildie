import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";
import rateReducer from "./slices/rateSlice";
import projectReducer from "./slices/projectSlice";
import settingsReducer from "./slices/settingsSlice";
import boqReducer from "./slices/boqSlice";
import solarReducer from "./slices/solarSlice";
import liftReducer from "./slices/liftSlice";
import pumpReducer from "./slices/pumpSlice";
import rwhReducer from "./slices/rwhSlice";
import septiktankReducer from "./slices/septictankSlice";
import structuralReducer from "./slices/structuralSlice";
import earthworkreducer from "./slices/earthworkSlice";
import staircasereducer from "./slices/staircaseSlice";
import finishingreducer from "./slices/finishingSlice";
import firefightingReducer from "./slices/firefightingslice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    rates: rateReducer,
    projects: projectReducer,
    settings: settingsReducer,
    auth: authReducer,
    boq: boqReducer,
    solar: solarReducer,
    lift: liftReducer,
    pump: pumpReducer,
    rwh: rwhReducer,
    septiktank: septiktankReducer,
    structural: structuralReducer,
    earthwork: earthworkreducer,
    staircase: staircasereducer,
    finishing: finishingreducer,
    firefighting: firefightingReducer,
  },
});
