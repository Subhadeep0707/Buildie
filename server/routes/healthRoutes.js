import express from "express";
import getHealth from "../controllers/healthController.js";

const router = express.Router();
router.get("/", getHealth); //here get health is function reference not the function
export default router;
