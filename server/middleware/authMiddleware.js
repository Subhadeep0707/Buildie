import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  //Check if the header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Extract the token from the header ("Bearer <token>")
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Find the user by the ID inside the token, exclude the password, and attach to req
      req.user = await User.findById(decoded.id).select("-password");

      // to the next middleware or the controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  //If no token was found at all
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const admin = (req, res, next) => {
  // Check if a user exists on the request AND if their role is exactly 'admin'
  if (req.user && req.user.role === "admin") {
    next(); // They are an admin! Let them through to the route.
  } else {
    // They are logged in, but NOT an admin.
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};
