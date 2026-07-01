import bcrypt from "bcrypt";
import Donor from "../models/donormodels/Donor.models.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";
import { sendEmail } from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let user = null;

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
    } else if (role === "donor") {
      user = await Donor.findOne({ email });

      if (!user || !user.isEmailVerified) {
        return res.status(401).json({
          message: "Wrong credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Wrong credentials",
        });
      }
    } else if (role === "organisation") {
      user = await Organisation.findOne({ email });

      if (!user || !user.isEmailVerified) {
        return res.status(401).json({
          message: "Wrong credentials",
        });
      }

      if (!user.isAdminVerified) {
        return res.status(403).json({
          message:
            "Your verification is pending. Kindly wait or contact admin.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Wrong credentials",
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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

    return res.status(500).json({
      message: "Server error!",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    try {
      await sendEmail(
        user.email,
        "ShareBowl Password Reset OTP",
        `
        <h2>Password Reset OTP</h2>
        <p>Hello,</p>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        `
      );
    } catch (emailError) {
      console.error("RESET OTP EMAIL ERROR:", emailError.message);

      return res.status(500).json({
        message: "Failed to send OTP. Check email configuration.",
      });
    }

    return res.status(200).json({
      message: "OTP sent to your email",
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
    const { email, role, otp, password } = req.body;

    if (!email || !role || !otp || !password) {
      return res.status(400).json({
        message: "Email, role, OTP and password are required",
      });
    }

    let user;

    if (role === "donor") {
      user = await Donor.findOne({
        email,
        resetOtp: otp,
        resetOtpExpires: {
          $gt: Date.now(),
        },
      });
    } else if (role === "organisation") {
      user = await Organisation.findOne({
        email,
        resetOtp: otp,
        resetOtpExpires: {
          $gt: Date.now(),
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};