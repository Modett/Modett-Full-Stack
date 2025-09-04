import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { wishlistValidationRules } from "../utils/wishlist.validator.js";
import {
  createWishlist,
  getWishlist,
  updateWishlist,
  deleteWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  updateWishlistItem,
  getWishlistItems,
  getAllWishlists,
  deleteWishlistByAdmin,
} from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", auth, createWishlist);
wishlistRouter.get("/", auth, getWishlist);
wishlistRouter.put("/", auth, updateWishlist);
wishlistRouter.delete("/", auth, deleteWishlist);
wishlistRouter.post("/items", auth, addItemToWishlist);
wishlistRouter.delete("/items/:id", auth, removeItemFromWishlist);
wishlistRouter.put("/items/:id", auth, updateWishlistItem);
wishlistRouter.get("/items", auth, getWishlistItems);
wishlistRouter.get("/admin", auth, isAdmin, getAllWishlists);
wishlistRouter.delete("/admin/:id", auth, isAdmin, deleteWishlistByAdmin);

export default wishlistRouter;
