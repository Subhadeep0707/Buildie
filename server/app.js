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

// Allowed Origins for Local Development
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// CORS Middleware
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Built-in Express middleware
app.use(express.json());

// Custom middleware and Routes
app.use(logger);
app.use("/api/projects", projectRouter);
app.use("/api/health", router);
app.use("/api/estimates", estimateRouter);
app.use("/api/materials", materialrouter);
app.use("/api/blogs", blogRouter);

// Authentication Middleware
app.use("/api/auth", authRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
