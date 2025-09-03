import { body } from "express-validator";

export const wishlistValidationRules = [
  body("user").isMongoId().withMessage("A valid user ID is required"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("Wishlist must have at least one item"),
  body("items.*.product")
    .isMongoId()
    .withMessage("A valid product ID is required for each item"),
  body("items.*.preferredSize")
    .optional()
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Preferred size must be a valid value"),
  body("items.*.preferredColor")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("Preferred color cannot exceed 50 characters"),
  body("items.*.priceWhenAdded")
    .isFloat({ min: 0 })
    .withMessage("Price when added must be a positive number"),
  body("items.*.notes")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
  body("name")
    .optional()
    .isString()
    .isLength({ max: 100 })
    .withMessage("Wishlist name cannot exceed 100 characters"),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("isPublic")
    .optional()
    .isBoolean()
    .withMessage("isPublic must be a boolean value"),
  body("shareableLink")
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("Shareable link cannot exceed 200 characters"),
];
