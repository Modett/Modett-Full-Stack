import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: [
    {
      type: String,
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      priceAtThatTime: {
        type: Number,
        required: true,
      },
    },
  ],
  orders: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    },
  ],
  measurements: {
    chest: {
      type: Number,
    },
    waist: {
      type: Number,
    },
    inseam: {
      type: Number,
    },
  },
  profileImage: {
    type: String,
    default: "default.jpg",
  },
  newsLetterSubscribed: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
