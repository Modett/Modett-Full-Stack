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

// get all measurements from all users :admin
export const getAllMeasurements = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const measurements = await Measurement.find();
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

// get measurements by user id : admin;
export const getMeasurementByUserId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.params.id;
    const measurements = await Measurement.findOne({ userId });
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

// get measurement by measurement id : admin
export const getMeasurementByMeasurementId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const measurementId = req.params.id;
    const measurement = await Measurement.findById(measurementId).populate(
      "userId",
      "name email phone address role gender dateOfBirth"
    );
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

// update measurement by measurement id : admin
export const updateMeasurementByMeasurementId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const measurementId = req.params.id;
    const updateData = req.body;
    const measurement = await Measurement.findById(measurementId);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found." });
    }
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        measurement[key] = updateData[key];
      }
    });
    await measurement.save();
    await measurement.populate("userId", "name email phone");
    return res.status(200).json({
      message: "Measurement updated successfully.",
      measurement,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// delete measurement by measurement id : admin
export const deleteMeasurementByMeasurementId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const measurementId = req.params.id;
    const deleteMeasurement = await Measurement.findById(measurementId);
    if (!deleteMeasurement) {
      return res.status(404).json({ message: "Measurement not found." });
    }
    deleteMeasurement.isActive = false;
    await deleteMeasurement.save();
    return res
      .status(200)
      .json({ message: "Measurement deleted successfully." });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid measurement ID format" });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// create measurement for user : admin
export const createMeasurementForUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingMeasurement = await Measurement.findOne({
      userId,
      isActive: true,
    });
    if (existingMeasurement) {
      return res
        .status(400)
        .json({ message: "Measurement already exists for this user" });
    }
    const measurementData = { ...req.body };
    const newMeasurement = new Measurement(measurementData);
    await newMeasurement.save();
    return res.status(201).json({
      message: "Measurement created successfully.",
      measurement: newMeasurement,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
