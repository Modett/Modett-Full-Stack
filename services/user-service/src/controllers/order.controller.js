import Order from "../models/Order.js";
import User from "../models/User.js";

// user
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const order = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });
    await order.save();
    await order.populate("items.product", "name image");

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        orders: order._id,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) { 
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { orderStatus: "cancelled" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const updateShippingAddress = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { shippingAddress },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const getOrderIdByAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const deleteOrderByAdmin = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user credentials
// {
//   "emailOrPhone": "isabella.green@example.com",
//   "password": "IsabellaFashion2025!"
// }

// admin credentials
// {
//   "emailOrPhone": "admin@example.com",
//   "password": "AdminPassword123"
// }
