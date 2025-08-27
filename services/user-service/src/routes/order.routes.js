import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { createOrder,getOrders } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getOrders);
// orderRouter.get("/:id", auth, getOrderById);

export default orderRouter;
