import express from "express";
import AuthUser from "../models/AuthUser.js";

const router = express.Router();


// 🚀 SIGNUP API
router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await AuthUser.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = await AuthUser.create(req.body);

    res.json({
      message: "Signup successful",
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await AuthUser.findOne({ email, password });
  
      if (!user) {
        return res.json({ message: "Invalid credentials" });
      }
  
      res.json({
        message: "Login successful",
        user,
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;