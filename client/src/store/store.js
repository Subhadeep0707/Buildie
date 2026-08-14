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
import firefightingReducer from "./slices/firefightingSlice";
import plumbingReducer from "./slices/plumbingSlice";
import electricityReducer from "./slices/electricitySlice";
import blogReducer from "./slices/blogSlice";
import detailedRoomReducer from "./slices/detailedRoomSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    detailedRooms: detailedRoomReducer,
    rates: rateReducer,
    projects: projectReducer,
    blogs: blogReducer,
    settings: settingsReducer,
    auth: authReducer,
    boq: boqReducer,
    solar: solarReducer,
    lift: liftReducer,
    pump: pumpReducer,
    rwh: rwhReducer,
    septictank: septiktankReducer,
    structural: structuralReducer,
    earthwork: earthworkreducer,
    staircase: staircasereducer,
    finishing: finishingreducer,
    firefighting: firefightingReducer,
    plumbing: plumbingReducer,
    electricity: electricityReducer,
  },
});
