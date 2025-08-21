import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/auth.controller.js";
import { loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

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

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
