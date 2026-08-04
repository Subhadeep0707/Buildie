import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

export const calculateProjectEstimate = createAsyncThunk(
  "boq/calculate",
  async (projectData = {}, { getState, rejectWithValue }) => {
    try {
      //Access the entire Redux state
      const state = getState();
      //Extract solar state from solarSlice
      const solarState = state.solar;

      //Format solar input object expected by backend boqGenerator
      const solarInput = {
        systemCapacityKw: Number(solarState.systemCapacityKw) || undefined,
        roofAreaSqM: Number(solarState.roofAreaSqM) || undefined,
        costPerKwINR: Number(solarState.costPerKwINR) || 50000,
      };
       
       //Format Lift input object expected by backend boqGenerator
      const liftInput = {
        capacityPassengers: Number(state.lift.capacityPassengers) || 6,
        stops: Number(state.lift.stops) || 4,
        standardKey: state.lift.standardKey || "IS_14665",
        typeKey: state.lift.typeKey || "passengerMRL",
      };

      //Merge base project inputs with solarInput
      const unifiedPayload = {
        ...projectData,
        solarInput,
        liftInput,
      };

      //Fire single POST request with unified payload
      const response = await API.post("/api/estimates", unifiedPayload);
      const { data: finalResult } = response.data;
      return finalResult;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to calculate estimate",
      );
    }
  },
);

const boqSlice = createSlice({
  name: "boq",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBoqResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateProjectEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateProjectEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(calculateProjectEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBoqResult } = boqSlice.actions;
export default boqSlice.reducer;
