import Measurement from "../models/Measurement.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

// create user's measurements
export const createMeasurement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(errors);
  try {
    const userId = req.user.id;
    const measurementData = { ...req.body, userId };
    const existingMeasurement = await Measurement.findOne({
      userId,
      isActive: true,
    });
    if (existingMeasurement) {
      return res.status(409).json({
        message:
          "Active measurements already exist. Use update endpoint to modify.",
      });
    }
    const newMeasurement = new Measurement(measurementData);
    await newMeasurement.save();
    return res.status(201).json({
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
export const updateMeasurement = async (req, res) => {
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
    if (!existingMeasurement) {
      return res.status(404).json({
        message: "No active measurements found. Create measurements first.",
      });
    }

    // updated only provided fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && key !== "userId") {
        existingMeasurement[key] = req.body[key];
      }
    });
    await existingMeasurement.save();
    return res.status(200).json({
      message: "Measurement updated successfully",
      measurement: existingMeasurement,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get user's current measurements
export const getCurrentMeasurement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const getCurrentMeasurement = await Measurement.findOne({
      userId,
      isActive: true,
    });
    if (!getCurrentMeasurement) {
      return res.status(404).json({ message: "No active measurements found." });
    }
    return res.status(200).json({
      message: "Measurements retrieved successfully",
      measurement: getCurrentMeasurement,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// delete user's measurements
export const deleteMeasurement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const measurement = await Measurement.findOne({ userId, isActive: true });
    if (!measurement) {
      return res.status(404).json({ message: "No active measurements found." });
    }
    measurement.isActive = false;
    await measurement.save();
    return res
      .status(200)
      .json({ message: "Measurement deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get all user's measurements
export const getAllUserMeasurements = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const measurements = await Measurement.find({ userId }).sort({
      createdAt: -1,
    });
    if (!measurements || measurements.length === 0) {
      return res.status(404).json({ message: "No measurements found." });
    }
    return res.status(200).json({
      message: "Measurements retrieved successfully.",
      measurements,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get measurement by id
export const getMeasurementById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const measurementId = req.params.id;
    const measurement = await Measurement.findOne({
      userId,
      _id: measurementId,
    });
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found." });
    }
    return res.status(200).json({
      message: "Measurement retrieved successfully.",
      measurement,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
