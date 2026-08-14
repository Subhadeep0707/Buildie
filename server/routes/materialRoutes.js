import express from "express";
import {
  createMaterial,
  getMaterials,
  saveCustomRates,
  updateMaterial,
  deleteMaterial,
  verifyLiveMarketSource,
} from "../controllers/materialController.js";
import { protect } from "../middleware/authMiddleware.js";

const materialrouter = express.Router();

// GET endpoint for live source verification & redirection to InfraLens
materialrouter.get("/verify-source", verifyLiveMarketSource);

// POST endpoint for users to save their customized material rates (Protected)
materialrouter.post("/custom", protect, saveCustomRates);

materialrouter.post("/", createMaterial);
materialrouter.get("/", getMaterials);
materialrouter.put("/:id", updateMaterial);
materialrouter.delete("/:id", deleteMaterial);

export default materialrouter;
