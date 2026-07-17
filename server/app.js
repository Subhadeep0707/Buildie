import express from "express";
import router from "./routes/healthRoutes.js";
import logger from "./middleware/logger.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();

app.use(express.json()); //for parsing the raw request  body 

app.use(logger);
app.use("/api/projects", projectRouter);
app.use("/api/health", router);

export default app;
