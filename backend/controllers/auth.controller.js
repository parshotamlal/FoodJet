
import bcrypt from "bcrypt";
import User from "../models/user.model.js"; // make sure the path is correct
import getToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js";


export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    // Check if all fields are provided
    if (!fullName || !email || !password || !mobile || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be exactly 10 digits.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    // Generate Token
    const token = await getToken(user._id);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // For production: true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    // Remove password before sending response
    const userData = { ...user._doc };
    delete userData.password;

    return res.status(201).json({
      success: true,
      message: "Registration successful 🎉 Welcome aboard!",
      user: userData,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};






export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate Token
    const token = await getToken(user._id);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Production: true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove password from response
    const userData = { ...user._doc };
    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "Login successful ✅ Welcome back!",
      user: userData,
      token,
    });

  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "You have been logged out successfully. See you soon! "
    });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Oops! Something went wrong while logging out. Please try again."
    });
  }
};




export const setOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp; 
    user.otpExpires = Date.now() + 5 * 60 * 1000; // ✅ unified
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP is invalid or expired" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined; // ✅ same field
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.isOtpVerified = false; // ✅ reset
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });
    }

    const token = await getToken(user._id);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ set true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ SEND RESPONSE BACK TO CLIENT
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};



