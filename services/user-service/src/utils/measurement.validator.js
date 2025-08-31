import { body } from "express-validator";

export const measurementValidationRules = [
  body("bust").isFloat({ min: 0 }).withMessage("Bust is required and must be a positive number"),
  body("waist").isFloat({ min: 0 }).withMessage("Waist is required and must be a positive number"),
  body("hips").isFloat({ min: 0 }).withMessage("Hips is required and must be a positive number"),
  body("standardSize")
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Standard size is required and must be a valid value"),
  body("unit")
    .isIn(["inches", "cm"])
    .withMessage("Unit is required and must be 'inches' or 'cm'"),
  body("fitPreference")
    .optional()
    .isIn(["slim", "regular", "loose"])
    .withMessage("Fit preference must be 'slim', 'regular', or 'loose'"),
  body("cupSize")
    .optional()
    .isIn(["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H"])
    .withMessage("Cup size must be a valid value"),
  body("notes")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Notes must be a string up to 500 characters"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("takenBy")
    .optional()
    .isIn(["self", "tailor", "staff"])
    .withMessage("takenBy must be 'self', 'tailor', or 'staff'"),
  // Optional numeric fields
  body("underbust").optional().isFloat({ min: 0 }),
  body("shoulderWidth").optional().isFloat({ min: 0 }),
  body("armLength").optional().isFloat({ min: 0 }),
  body("inseam").optional().isFloat({ min: 0 }),
  body("outseam").optional().isFloat({ min: 0 }),
  body("thigh").optional().isFloat({ min: 0 }),
  body("neckCircumference").optional().isFloat({ min: 0 }),
  body("frontLength").optional().isFloat({ min: 0 }),
  body("backLength").optional().isFloat({ min: 0 }),
  body("sleeveLength").optional().isFloat({ min: 0 }),
  body("armhole").optional().isFloat({ min: 0 }),
  body("jacketLength").optional().isFloat({ min: 0 }),
  body("blazerLength").optional().isFloat({ min: 0 }),
  body("skirtLength").optional().isFloat({ min: 0 }),
  body("pantWaist").optional().isFloat({ min: 0 }),
  body("crotchDepth").optional().isFloat({ min: 0 }),
];