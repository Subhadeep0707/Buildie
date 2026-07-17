import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost/Mywp/wp-json/wp/v2/buildie_project";

const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",

  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      return data.map((project) => {
        const rawData =
          project.meta?.project_data || project.acf?.project_data || null;

        const parsedData = rawData ? JSON.parse(rawData) : {};

        return {
          id: project.id,
          name: project.title.rendered,
          createdAt: project.date,
          formData: parsedData.formData || {},
          roomData: parsedData.roomData || {},
          floors: parsedData.floors || [],
          result: parsedData.result || {},
          mode: parsedData.mode || "volume",
        };
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const saveProjectAsync = createAsyncThunk(
  "projects/saveProjectAsync",

  async (project, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: project.name,
          status: "publish",
          meta: {
            project_data: JSON.stringify(project),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const data = await response.json();
      return {
        ...project,
        wpId: data.id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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
