import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import isAdmin from "../../middleware/admin.middleware.js";
import { newsletterValidationRules } from "../utils/newsletter.validator.js";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  updateSubscriberPreferences,
  getAllSubscribers,
  getSubscriberByEmail,
  getSubscriberStats,
} from "../controllers/newsletter.controller.js";

const newsLetterRouter = express.Router();

newsLetterRouter.post(
  "/subscribe",
  auth,
  newsletterValidationRules,
  subscribeToNewsletter
);

newsLetterRouter.post(
  "/unsubscribe",
  auth,
  newsletterValidationRules,
  unsubscribeFromNewsletter
);

newsLetterRouter.put(
  "/update-preferences",
  auth,
  newsletterValidationRules,
  updateSubscriberPreferences
);

newsLetterRouter.get(
  "/admin/subscribers",
  auth,
  isAdmin,
  getAllSubscribers
);

newsLetterRouter.get(
  "/admin/subscriber",
  auth,
  isAdmin,
  getSubscriberByEmail
);

newsLetterRouter.get(
  "/admin/subscriber-stats",
  auth,
  isAdmin,
  getSubscriberStats
);

export default newsLetterRouter;
