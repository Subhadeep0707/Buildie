import Project from "../models/projects.js";

export const createProject = async (req, res) => {
  try {
    // Inject the logged-in user's ID into the project data before saving
    const projectData = { ...req.body, user: req.user._id };
    const newProject = await Project.create(projectData);
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
    // Fetches projects matching the user's ID, sorted newest first
    const projects = await Project.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
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
    // Ensures the project exists AND belongs to the user requesting the deletion
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you do not have permission to delete it",
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
