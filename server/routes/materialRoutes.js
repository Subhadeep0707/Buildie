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

// Public endpoint for live verification redirection
materialrouter.get("/verify-source", verifyLiveMarketSource);

// Protected routes (req.user populated)
materialrouter.post("/custom", protect, saveCustomRates);
materialrouter.get("/", protect, getMaterials);
materialrouter.post("/", protect, createMaterial);
materialrouter.put("/:id", protect, updateMaterial);
materialrouter.delete("/:id", protect, deleteMaterial);

export default materialrouter;
