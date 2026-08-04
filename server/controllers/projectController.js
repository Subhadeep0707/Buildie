import Project from "../models/projects.js";

const createProject = async (req, res) => {
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

export default createProject;
