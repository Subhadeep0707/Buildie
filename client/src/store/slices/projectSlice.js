import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axiosInstance";

const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];

// THUNKS
export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async (_, thunkAPI) => {
    try {
      //Simple GET request using Axios
      const response = await API.get("/api/projects");
      //Node.js (via MongoDB) should send back clean objects!
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
      //Axios automatically injects the JWT token from your interceptor!
      // We just pass the raw 'project' object directly to Node.
      const response = await API.post("/api/projects", project);
      // Node should return the newly saved project
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to save project";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// THE SLICE
const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: initialProjects,
    activeProject: null,
    loading: false,
    error: null,
  },
  reducers: {
    saveProject: (state, action) => {
      state.projects.unshift(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
      localStorage.removeItem("projects");
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
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
        localStorage.setItem("projects", JSON.stringify(action.payload));
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
        localStorage.setItem("projects", JSON.stringify(state.projects));
      })
      .addCase(saveProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  saveProject,
  deleteProject,
  setActiveProject,
  clearProjects,
  setProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
