import bcrypt from "bcrypt";

import Donor from "../models/donormodels/Donor.models.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";

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

      console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
  console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
  console.log("EMAIL FROM LOGIN:", email);
  console.log("PASSWORD FROM LOGIN:", password);

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
      secure: false,
      sameSite: "lax",
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

    res.clearCookie("token");

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

