import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

export const calculateProjectEstimate = createAsyncThunk(
  "boq/calculate",
  async (projectPayload, { rejectWithValue }) => {
    try {
      // Fire single POST request with the fully constructed payload from Dashboard.jsx
      const response = await API.post("/api/estimates", projectPayload);

      // Grab the data directly if the nested 'data' property doesn't exist
      const finalResult = response.data?.data || response.data;

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
