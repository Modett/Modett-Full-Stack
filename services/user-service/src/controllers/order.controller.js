import Order from "../models/Order.js";
import User from "../models/User.js";

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

//  items, shippingAddress, paymentMethod
