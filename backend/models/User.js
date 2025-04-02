import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  totalreferral:{type:Number,default:0},
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  referralUsed: { type: Boolean, default: false },
  discountAmount: { type: Number, default: 0 },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(3).toString("hex").toUpperCase();
  }
  next();
});

export default mongoose.model("User", userSchema);