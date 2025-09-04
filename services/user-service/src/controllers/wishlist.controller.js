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

export const updateWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const { items, name, description, isPublic } = req.body;
    const wishlist = await Wishlist.findOne(userId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    if (name !== undefined) {
      wishlist.name = name;
    }
    if (description !== undefined) {
      wishlist.description = description;
    }
    if (isPublic !== undefined) {
      wishlist.isPublic = isPublic;
    }
    if (items !== undefined) {
      wishlist.items = items;
    }
    await wishlist.save();
    res.status(200).json({ message: "Wishlist updated", wishlist });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedWishlist = await Wishlist.findOneAndDelete({ user: userId });
    if (!deletedWishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res
      .status(200)
      .json({ message: "Wishlist deleted successfully", deletedWishlist });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addItemToWishlist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.user.id;
    const { product, preferredSize, preferredColor, priceWhenAdded, notes } =
      req.body;

    if (!product || !priceWhenAdded) {
      return res.status(400).json({
        error: "Product ID and price are required",
      });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId });
    }

    const existingItemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === product.toString()
    );

    if (existingItemIndex > -1) {
      return res.status(400).json({
        error: "Item already exists in wishlist",
      });
    }

    const newItem = {
      product,
      preferredSize,
      preferredColor,
      priceWhenAdded,
      notes,
      addedAt: new Date(),
    };

    wishlist.items.push(newItem);
    await wishlist.save();

    await wishlist.populate("items.product");

    res.status(201).json({
      message: "Item added to wishlist successfully",
      wishlist,
      addedItem: newItem,
    });
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const removeItemFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const wishlist = await Wishlist.findOne(userId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    const itemIndex = wishlist.items.indexOf(productId);
    if (itemIndex == -1) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }
    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();
    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateWishlistItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, updateData } = req.body;

    if (!productId || !updateData) {
      return res
        .status(400)
        .json({ error: "Product ID and update data are required" });
    }
    const wishlist = await Wishlist.findOne(userId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in wishlist" });
    }

    wishlist.items[itemIndex] = {
      ...wishlist.items[itemIndex],
      ...updateData,
    };

    await wishlist.save();
    res
      .status(200)
      .json({ message: "Wishlist item updated successfully", wishlist });
  } catch (error) {
    console.error("Error updating wishlist item:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
