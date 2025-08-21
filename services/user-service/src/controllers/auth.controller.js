import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

dotenv.config();

export const registerUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, phone, password, gender, dateOfBirth, address, role } =
      req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      gender,
      dateOfBirth,
      address,
      role,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Make sure JWT_SECRET is set in your .env file
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
