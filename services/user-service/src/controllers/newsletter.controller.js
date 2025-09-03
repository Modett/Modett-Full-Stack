import Newsletter from "../models/Newsletter.js";
import { validationResult } from "express-validator";

export const subscribeToNewsletter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      email,
      firstName,
      lastName,
      preferences,
      interests,
      sizePreferences,
      ageRange,
      profession,
      source,
      consentGiven,
    } = req.body;

    // Validate required fields
    if (!email || !consentGiven) {
      return res
        .status(400)
        .json({ message: "Email and consent are required." });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existing && existing.isActive) {
      return res.status(409).json({ message: "Email is already subscribed." });
    }

    // Reactivate if previously unsubscribed
    if (existing) {
      existing.isActive = true;
      existing.unsubscribedAt = undefined;
      existing.unsubscribeReason = undefined;
      existing.firstName = firstName || existing.firstName;
      existing.lastName = lastName || existing.lastName;
      existing.preferences = preferences || existing.preferences;
      existing.interests = interests || existing.interests;
      existing.sizePreferences = sizePreferences || existing.sizePreferences;
      existing.ageRange = ageRange || existing.ageRange;
      existing.profession = profession || existing.profession;
      existing.source = source || existing.source;
      existing.consentGiven = consentGiven;
      existing.consentDate = Date.now();
      await existing.save();
      return res.status(200).json({
        message: "Subscription reactivated and updated.",
        subscriber: existing,
      });
    }

    // Create new subscription
    const newSubscriber = new Newsletter({
      email,
      firstName,
      lastName,
      preferences,
      interests,
      sizePreferences,
      ageRange,
      profession,
      source,
      consentGiven,
      consentDate: Date.now(),
      isActive: true,
    });

    await newSubscriber.save();
    return res
      .status(201)
      .json({ message: "Subscribed successfully.", subscriber: newSubscriber });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const unsubscribeFromNewsletter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, unsubscribeReason } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required to unsubscribe." });
    }
    const subscriber = await Newsletter.findOne({
      email: email.toLowerCase().trim(),
    });
    if (!subscriber || !subscriber.isActive) {
      return res
        .status(404)
        .json({ message: "Subscriber not found or already unsubscribed." });
    }
    subscriber.isActive = false;
    subscriber.unsubscribedAt = Date.now();
    subscriber.unsubscribeReason = unsubscribeReason || "Other";
    await subscriber.save();
    return res.status(200).json({ message: "Unsubscribed successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateSubscriberPreferences = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, preferences, interests, sizePreferences } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const subscriber = await Newsletter.findOne({
      email: email.toLowerCase().trim(),
      isActive: true,
    });
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found." });
    }
    subscriber.preferences = preferences || subscriber.preferences;
    subscriber.interests = interests || subscriber.interests;
    subscriber.sizePreferences = sizePreferences || subscriber.sizePreferences;
    await subscriber.save();
    return res
      .status(200)
      .json({ message: "Preferences updated successfully.", subscriber });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// admin
export const getAllSubscribers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const subscribers = await Newsletter.find();
    return res.status(200).json({ subscribers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// admin
export const getSubscriberByEmail=async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const {email}=req.body;
    const subscriber=await Newsletter.findOne({email:email.toLowerCase().trim()});
    if(!subscriber){
      return res.status(404).json({message:"Subscriber not found."});
    }
    return res.status(200).json({subscriber});
  }catch(error){
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// admin