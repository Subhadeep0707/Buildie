import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const projectRouter = express.Router();
projectRouter.post("/", protect, createProject);
projectRouter.get("/", protect, getProjects);
projectRouter.delete("/:id", protect, deleteProject);

export default projectRouter;
