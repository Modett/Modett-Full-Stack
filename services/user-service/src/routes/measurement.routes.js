import {
  createMeasurement,
  updateMeasurement,
  getCurrentMeasurement,
  deleteMeasurement,
  getAllUserMeasurements,
  getMeasurementById,
} from "../controllers/measurement.controller.js";
import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { measurementValidationRules } from "../utils/measurement.validator.js";

const measurementRouter = express.Router();

measurementRouter.post(
  "/",
  auth,
  measurementValidationRules,
  createMeasurement
);
measurementRouter.put("/", auth, measurementValidationRules, updateMeasurement);
measurementRouter.get(
  "/",
  auth,
  measurementValidationRules,
  getCurrentMeasurement
);
measurementRouter.delete(
  "/",
  auth,
  measurementValidationRules,
  deleteMeasurement
);
measurementRouter.get(
  "/all",
  auth,
  measurementValidationRules,
  getAllUserMeasurements
);
measurementRouter.get(
  "/:id",
  auth,
  measurementValidationRules,
  getMeasurementById
);
export default measurementRouter;
