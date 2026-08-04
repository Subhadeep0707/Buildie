import express from "express";
import {
  createMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materialController.js";

const materialrouter = express.Router();

// POST request to create a new material
materialrouter.post("/", createMaterial);

// GET request to fetch all materials
materialrouter.get("/", getMaterials);

//PUT request to update existing material
materialrouter.put("/:id", updateMaterial);

//DELETE request to delete existing material
materialrouter.delete("/:id", deleteMaterial);

export default materialrouter;
