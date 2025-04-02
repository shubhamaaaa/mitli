import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// Generate a unique referral code
const generateReferralCode = () =>
  crypto.randomBytes(5).toString("hex").toUpperCase();

// Register User
export const registerUser = async (req, res) => {
  const { email, password, mobile, referralCode, totalreferral } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate referral code if provided
    let referredByUser = null;
    if (referralCode) {
      referredByUser = await User.findOne({ referralCode: referralCode });
      if (!referredByUser) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      mobile,
      referralCode: generateReferralCode(), // Generate unique referral code
      referredBy: referredByUser ? referredByUser._id : null, // Store the referrer's ID
      referralUsed: false,
      totalreferral,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ success: true, token, user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `Click the link to reset your password: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get User Profile (Referral Code)
export const getUserProfile = async (req, res) => {
  try {
    const { productId } = req.query; // Get productId from the request query
    const user = await User.findById(req.user.id).select("email referralCode");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Generate the referral link with productId
    const referralUrl = `${productId}?ref=${user.referralCode}`;

    return res.json({ success: true, referralUrl });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allUsers=async(req,res)=>{
  try {
    const Users=await User.find({}).select('-password')
    res.json({success:true,Users})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET, 
        );
      
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};