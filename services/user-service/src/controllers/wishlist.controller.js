import Wishlist from "../models/Wishlist.js";
import { validationResult } from "express-validator";

export const createWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { user, items, name, description, isPublic } = req.body;
    if (!user) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const existingWishlist = await Wishlist.findOne({ user });
    if (existingWishlist) {
      return res
        .status(400)
        .json({ error: "Wishlist already exists for this user" });
    }
    const wishlist = new Wishlist({
      user,
      name,
      items,
      description,
      isPublic,
    });
    await wishlist.save();
    return res
      .status(201)
      .json({ message: "Wishlist created successfully", wishlist });
  } catch (error) {
    console.error("Error creating wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne(userId).populate("items.product");
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
