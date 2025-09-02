import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    firstName: {
      type: String,
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },

    // Subscription preferences
    preferences: {
      newArrivals: {
        type: Boolean,
        default: true,
      },
      salesAndOffers: {
        type: Boolean,
        default: true,
      },
      fashionTips: {
        type: Boolean,
        default: false,
      },
      personalStyling: {
        type: Boolean,
        default: false,
      },
      events: {
        type: Boolean,
        default: false,
      },
    },

    // Professional wear categories of interest
    interests: [
      {
        type: String,
        enum: [
          "blazers",
          "dresses",
          "skirts",
          "pants",
          "tops",
          "accessories",
          "shoes",
          "outerwear",
        ],
      },
    ],

    // Size preferences for targeted offers
    sizePreferences: {
      standardSize: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      },
      cupSize: {
        type: String,
        enum: ["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H"],
      },
    },

    // Subscription status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Source tracking
    source: {
      type: String,
      enum: ["website", "social_media", "referral", "in_store", "other"],
      default: "website",
    },

    // Engagement tracking
    lastEmailOpened: {
      type: Date,
    },

    totalEmailsOpened: {
      type: Number,
      default: 0,
    },

    lastClickDate: {
      type: Date,
    },

    totalClicks: {
      type: Number,
      default: 0,
    },

    // Demographics (optional)
    ageRange: {
      type: String,
      enum: ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
    },

    profession: {
      type: String,
      enum: [
        "business_executive",
        "entrepreneur",
        "lawyer",
        "doctor",
        "consultant",
        "finance",
        "education",
        "government",
        "other",
      ],
    },

    // GDPR compliance
    consentGiven: {
      type: Boolean,
      required: true,
      default: true,
    },

    consentDate: {
      type: Date,
      default: Date.now,
    },

    // Unsubscribe tracking
    unsubscribedAt: {
      type: Date,
    },

    unsubscribeReason: {
      type: String,
      enum: [
        "too_frequent",
        "not_relevant",
        "changed_email",
        "privacy_concerns",
        "other",
      ],
    },
  },
  {
    timestamps: true,
  }
);
