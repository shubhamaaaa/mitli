import express from "express";
import {
  adminLogin,
  allUsers,
  forgotPassword,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";
import authUser from "../middleware/authUser.js"; // Import middleware
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/admin", adminLogin);
router.post("/reset-password/:token", resetPassword);
router.get("/getuser", authUser, getUserProfile);
router.get("/alluser", allUsers); // Apply middleware

export default router;