import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { newsletterValidationRules } from "../utils/newsletter.validator.js";
import { subscribeToNewsletter } from "../controllers/newsletter.controller.js";

const newsLetterRouter = express.Router();

newsLetterRouter.post(
  "/subscribe",
  auth,
  newsletterValidationRules,
  subscribeToNewsletter
);

export default newsLetterRouter;
