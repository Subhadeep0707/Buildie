import express from "express";
import {
  createMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial,
  verifyLiveMarketSource,
} from "../controllers/materialController.js";

const materialrouter = express.Router();

// GET endpoint for live source verification & redirection to InfraLens
materialrouter.get("/verify-source", verifyLiveMarketSource);

materialrouter.post("/", createMaterial);
materialrouter.get("/", getMaterials);
materialrouter.put("/:id", updateMaterial);
materialrouter.delete("/:id", deleteMaterial);

export default materialrouter;
