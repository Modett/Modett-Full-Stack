import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },
  preferredSize: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  },
  preferredColor: {
    type: String,
    trim: true,
  },
  priceWhenAdded: {
    type: Number,
    required: true,
    min: 0,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Notes cannot exceed 500 characters"],
  },
});

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: true,
    },
    items: [wishlistItemSchema],
    name: {
      type: String,
      default: "My Wishlist",
      trim: true,
      maxlength: [100, "Wishlist name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareableLink: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

// Virtual to get total number of items
wishlistSchema.virtual("itemCount").get(function () {
  return this.items.length;
});

// Virtual to calculate total value of wishlist
wishlistSchema.virtual("totalValue").get(function () {
  return this.items.reduce((total, item) => total + item.priceWhenAdded, 0);
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
