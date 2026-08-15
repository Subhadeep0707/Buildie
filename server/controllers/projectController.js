import Project from "../models/projects.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

//  Fetch all projects
export const getProjects = async (req, res) => {
  try {
    // Fetches all projects, sorted newest first
    const projects = await Project.find().sort({ createdAt: -1 });

    // Note: Your frontend projectSlice expects the raw array back!
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

//  Remove a project by ID
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
