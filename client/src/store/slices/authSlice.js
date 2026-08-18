import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

//REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//UPDATE PROFILE (Customer)
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await API.put("/api/auth/profile", userData);
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Profile update failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//UPDATE USER (Admin)
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      const response = await API.put(`/api/auth/${id}`, userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "User update failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//DELETE USER (Admin)
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/api/auth/${id}`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete user";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Initial State
const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

//Slices
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE PROFILE (Customer)
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE USER (Admin)
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // Checking if the admin is updating their own profile and sync if necessary
        if (state.user && state.user._id === action.payload._id) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
