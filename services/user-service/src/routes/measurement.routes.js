import {
  createMeasurement,
  updateMeasurement,
  getCurrentMeasurement,
  deleteMeasurement,
  getAllUserMeasurements,
  getMeasurementById,
  getAllMeasurements,
  getMeasurementByUserId,
  getMeasurementByMeasurementId,
  updateMeasurementByMeasurementId,
  deleteMeasurementByMeasurementId,
  createMeasurementForUser,
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
  "/history",
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
measurementRouter.get(
  "/admin/all",
  auth,
  isAdmin,
  //   measurementValidationRules,
  getAllMeasurements
);
measurementRouter.get(
  "/admin/user/:id",
  auth,
  isAdmin,
  //   measurementValidationRules,
  getMeasurementByUserId
);
measurementRouter.get(
  "/admin/:id",
  auth,
  isAdmin,
  //   measurementValidationRules,
  getMeasurementByMeasurementId
);
measurementRouter.put(
  "/admin/:id",
  auth,
  isAdmin,
  measurementValidationRules,
  updateMeasurementByMeasurementId
);
measurementRouter.delete(
  "/admin/:id",
  auth,
  isAdmin,
  //   measurementValidationRules,
  deleteMeasurementByMeasurementId
);
measurementRouter.post(
  "/admin/user",
  auth,
  isAdmin,
  measurementValidationRules,
  createMeasurementForUser
);

export default measurementRouter;
