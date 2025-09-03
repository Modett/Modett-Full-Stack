import { body } from "express-validator";

export const newsletterValidationRules = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("consentGiven")
    .isBoolean()
    .custom((value) => value === true)
    .withMessage("Consent must be given to subscribe"),
  body("firstName")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters"),
  body("lastName")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters"),
  body("preferences")
    .optional()
    .isObject()
    .withMessage("Preferences must be an object"),
  body("interests")
    .optional()
    .isArray()
    .withMessage("Interests must be an array of strings"),
  body("sizePreferences.standardSize")
    .optional()
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Standard size must be a valid value"),
  body("sizePreferences.cupSize")
    .optional()
    .isIn(["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H"])
    .withMessage("Cup size must be a valid value"),
  body("ageRange")
    .optional()
    .isIn(["18-25", "26-35", "36-45", "46-55", "56-65", "65+"])
    .withMessage("Age range must be a valid value"),
  body("profession")
    .optional()
    .isIn([
      "business_executive",
      "entrepreneur",
      "lawyer",
      "doctor",
      "consultant",
      "finance",
      "education",
      "government",
      "other",
    ])
    .withMessage("Profession must be a valid value"),
  body("source")
    .optional()
    .isIn(["website", "social_media", "referral", "in_store", "other"])
    .withMessage("Source must be a valid value"),
];
