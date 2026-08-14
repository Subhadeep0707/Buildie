import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch materials dynamically from backend API based on city
export const fetchMaterialRates = createAsyncThunk(
  "rates/fetchMaterialRates",
  async (city = "Kolkata", thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/materials?city=${city}`,
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Fetch live verification redirection link for InfraLens
export const verifyLiveSourceUrl = createAsyncThunk(
  "rates/verifyLiveSourceUrl",
  async (city = "Kolkata", thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/materials/verify-source?city=${city}`,
      );
      return response.data.redirectUrl;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// NEW: Save custom user-specific rates
export const saveCustomRates = createAsyncThunk(
  "rates/saveCustomRates",
  async (customRates, thunkAPI) => {
    try {
      // Get the auth token from Redux state
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/materials/custom",
        { materials: customRates },
        config,
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const rateSlice = createSlice({
  name: "rates",
  initialState: {
    rates: {},
    materials: [],
    loading: false,
    error: null,
    liveVerificationUrl: "https://infralens.in/prices",
  },
  reducers: {
    updateRates: (state, action) => {
      state.rates = {
        ...state.rates,
        ...action.payload,
      };
    },
    resetRates: (state) => {
      state.rates = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialRates.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterialRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyLiveSourceUrl.fulfilled, (state, action) => {
        state.liveVerificationUrl = action.payload;
      })
      // Handle saving custom rates
      .addCase(saveCustomRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCustomRates.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCustomRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateRates, resetRates } = rateSlice.actions;
export default rateSlice.reducer;
