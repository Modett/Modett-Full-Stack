import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);

export default orderRouter;
