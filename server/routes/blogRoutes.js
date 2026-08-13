import express from "express";
import { getConTechNews } from "../controllers/blogController.js";

const blogRouter = express.Router();

// Maps to GET /api/blogs
blogRouter.get("/", getConTechNews);

export default blogRouter;
