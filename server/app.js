import express from "express";
import cors from "cors";
import router from "./routes/healthRoutes.js";
import logger from "./middleware/logger.js";
import projectRouter from "./routes/projectRoutes.js";
import estimateRouter from "./routes/estimateRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import materialrouter from "./routes/materialRoutes.js";
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// CORS middleware BEFORE  routes
app.use(
  cors({
    origin: "http://localhost:5173", // The URL of  React frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request types
    credentials: true, // Allows cookies/authorization headers if needed later
  }),
);

//Built-in Express middleware
app.use(express.json());

//Custom middleware and Routes
app.use(logger);
app.use("/api/projects", projectRouter);
app.use("/api/health", router);
app.use("/api/estimates", estimateRouter);
app.use("/api/materials", materialrouter);
app.use("/api/blogs", blogRouter);

//Authentication Middleware
app.use("/api/auth", authRouter);

//Global Errorhandler middleware
app.use(errorHandler);

export default app;
