import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { createOrder,getOrders,getOrderById, cancelOrder,updateShippingAddress,updatePaymentStatus,updateOrderStatus,getAllOrders } from "../controllers/order.controller.js";

const orderRouter = express.Router();

// user routes
orderRouter.post("/", auth, createOrder);
orderRouter.get("/", auth, getOrders);
orderRouter.get("/:id",auth,getOrderById);
orderRouter.put("/:id/cancel",auth,cancelOrder);
orderRouter.put("/:id/shipping-address",auth,updateShippingAddress);

// admin routes
orderRouter.get("/admin/all",auth,isAdmin,getAllOrders);
orderRouter.put("/admin/:id/payment-status",auth,isAdmin,updatePaymentStatus);
orderRouter.put("/admin/:id/order-status",auth,isAdmin,updateOrderStatus);

export default orderRouter;
