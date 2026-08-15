import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/", getProjects);
projectRouter.delete("/:id", deleteProject);

export default projectRouter;
