import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteUser,
  changeEmailOrPhone,
} from "../controllers/auth.controller.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const authRouter = express.Router();

const registerValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const loginValidationRules = [
  body("emailOrPhone").notEmpty().withMessage("Email or phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/protected", auth, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});
authRouter.get("/", auth, getProfile);
authRouter.put("/", auth, updateProfile);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/change-password", auth, changePassword);
authRouter.delete("/", auth, deleteUser);
authRouter.put("/change-email-or-phone", auth, changeEmailOrPhone);
export default authRouter;
