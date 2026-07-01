import bcrypt from "bcrypt";
import validator from "validator"; 
import Donor from "../models/donormodels/Donor.models.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = null;

    // ================= ADMIN =================
    if (role === "admin") {

      if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
      ) {
        return res.status(401).json({
          message: "Wrong credentials",
        });
      }
    
      user = {
        _id: "admin",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      };
    }


    

    // ================= DONOR =================
    else if (role === "donor") {
      user = await Donor.findOne({ email });

      if (!user || !user.isEmailVerified) {
        return res.status(401).json({ message: "Wrong credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Wrong credentials" });
      }
    }

    // ================= ORGANISATION =================
    else if (role === "organisation") {
      user = await Organisation.findOne({ email });

      if (!user || !user.isEmailVerified) {
        return res.status(401).json({ message: "Wrong credentials" });
      }

      if (!user.isAdminVerified) {
        return res.status(403).json({
          message:
            "Your verification is pending. Kindly wait or contact admin.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Wrong credentials" });
      }
    }

    // ================= INVALID ROLE =================
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ================= GENERATE TOKEN =================
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ================= UNIFIED RESPONSE =================
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error!" });
  }
};

//logout 
export const logout = async (req, res) => {

  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


//for protect internal route
export const getMe = (req, res) => {
  return res.json({
    user: req.user,
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        message: "Email and role are required",
      });
    }

    let user;

    if (role === "donor") {
      user = await Donor.findOne({ email });
    } else if (role === "organisation") {
      user = await Organisation.findOne({ email });
    } else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const resetUrl = `${frontendUrl}/reset-password/${resetToken}?role=${role}`;

    await sendEmail(
      user.email,
      "ShareBowl Password Reset",
      `
      <h2>Password Reset Request</h2>
      <p>Hello,</p>
      <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      `
    );

    return res.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, role } = req.body;

    if (!password || !role) {
      return res.status(400).json({
        message: "Password and role are required",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    let user;

    if (role === "donor") {
      user = await Donor.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } else if (role === "organisation") {
      user = await Organisation.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};