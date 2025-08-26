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

export const getOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user.id}).sort({createdAt:-1});
        res.json(orders);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

export const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findOne({_id:req.params.id,user:req.user.id});
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}