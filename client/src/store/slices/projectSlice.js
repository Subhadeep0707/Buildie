import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];

// THUNKS Detching and Saving 
export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/api/projects");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch projects";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const saveProjectAsync = createAsyncThunk(
  "projects/saveProjectAsync",
  async (project, thunkAPI) => {
    try {
      const response = await API.post("/api/projects", project);
      return response.data.data || response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to save project";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//  THUNK for Deleting
export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProjectAsync",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/api/projects/${id}`);
      return id; // Return the ID so the reducer knows which one to remove
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete project";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

//  SLICE
const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: initialProjects,
    activeProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
      localStorage.removeItem("projects");
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Cases
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save Cases
      .addCase(saveProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(saveProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Cases
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload,
        );
      });
  },
});

export const { setActiveProject, clearProjects } = projectSlice.actions;

export default projectSlice.reducer;
