import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteUser,
  changeEmailOrPhone,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUserByAdmin,
} from "../controllers/auth.controller.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";

const authRouter = express.Router();

// User routes
authRouter.get("/protected", auth, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
authRouter.get("/", auth, getProfile);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/change-password", auth, changePassword);
authRouter.put("/", auth, updateProfile);
authRouter.put("/change-email-or-phone", auth, changeEmailOrPhone);
authRouter.delete("/", auth, deleteUser);

// Admin routes
authRouter.get("/admin/get-all-users", auth, isAdmin, getAllUsers);
authRouter.get("/admin/get-user/:id", auth, isAdmin, getUserById);
authRouter.put("/admin/update-user-role/:id", auth, isAdmin, updateUserRole);
authRouter.delete("/admin/delete/:id", auth, isAdmin, deleteUserByAdmin);

export default authRouter;
