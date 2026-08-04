import express from "express";
import createEstimate from "../controllers/estimateController.js";

const estimateRouter = express.Router();

estimateRouter.post("/", createEstimate);

export default estimateRouter;
