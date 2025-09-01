import Measurement from "../models/Measurement.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

// create user's measurements

export const createMeasurement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const measurementData = { ...req.body, userId };
    const existingMeasurement = await Measurement.findOne({
      userId,
      isActive: true,
    });
    if (existingMeasurement) {
      return res
        .status(409)
        .json({
          message:
            "Active measurements already exist. Use update endpoint to modify.",
        });
    }
    const newMeasurement = new Measurement(measurementData);
    await newMeasurement.save();
    return res
      .status(201)
      .json({
        message: "Measurement created successfully",
        measurement: newMeasurement,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.messag });
  }
};

// update user's measurements

