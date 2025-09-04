import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { wishlistValidationRules } from "../utils/wishlist.validator.js";
import { createWishlist,getWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", auth, wishlistValidationRules, createWishlist);
wishlistRouter.get("/", auth, getWishlist);

export default wishlistRouter;
