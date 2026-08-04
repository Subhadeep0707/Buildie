import express from "express";
import {
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

//Customer Routes
authRouter.put("/profile", protect, updateUserProfile);

//Admin Routes
// :id is a dynamic parameter that holds the user's specific database ID
authRouter.put("/:id", protect, admin, updateUser);
authRouter.delete("/:id", protect, admin, deleteUser);

export default authRouter;
