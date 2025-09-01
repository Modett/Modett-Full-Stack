import { createMeasurement} from "../controllers/measurement.controller.js";
import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { measurementValidationRules } from "../utils/measurement.validator.js";

const measurementRouter = express.Router();

measurementRouter.post("/", auth, measurementValidationRules, createMeasurement);
export default measurementRouter;