import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch materials dynamically from backend API based on city
export const fetchMaterialRates = createAsyncThunk(
  "rates/fetchMaterialRates",
  async (city = "Kolkata", thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.get(
        `http://localhost:5000/api/materials?city=${city}`,
        config,
      );
      return (
        response.data?.data || response.data?.materials || response.data || []
      );
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
      return response.data?.redirectUrl || "https://infralens.in/prices";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Save custom user-specific rates
export const saveCustomRates = createAsyncThunk(
  "rates/saveCustomRates",
  async (customRates, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.post(
        "http://localhost:5000/api/materials/custom",
        { materials: customRates },
        config,
      );
      return (
        response.data?.data ||
        response.data?.materials ||
        response.data ||
        customRates
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

// Delete a material permanently by DB ID
export const deleteMaterialRate = createAsyncThunk(
  "rates/deleteMaterialRate",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token;
      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      await axios.delete(`http://localhost:5000/api/materials/${id}`, config);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const mapMaterialsToRates = (materialsList) => {
  if (!Array.isArray(materialsList)) return {};
  const mapped = {};
  materialsList.forEach((item) => {
    const key = item.key || item.name?.toLowerCase().replace(/\s+/g, "");
    if (key) {
      mapped[key] =
        item.avgPrice ?? item.customRate ?? item.rate ?? item.minPrice ?? 0;
    }
  });
  return mapped;
};

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
        const payloadArray = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.materials = payloadArray;
        state.rates = {
          ...state.rates,
          ...mapMaterialsToRates(payloadArray),
        };
      })
      .addCase(fetchMaterialRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyLiveSourceUrl.fulfilled, (state, action) => {
        state.liveVerificationUrl = action.payload;
      })
      .addCase(saveCustomRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCustomRates.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.materials = action.payload;
          state.rates = {
            ...state.rates,
            ...mapMaterialsToRates(action.payload),
          };
        }
      })
      .addCase(saveCustomRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMaterialRate.fulfilled, (state, action) => {
        state.materials = state.materials.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export const { updateRates, resetRates } = rateSlice.actions;
export default rateSlice.reducer;
