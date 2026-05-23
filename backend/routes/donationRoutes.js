import express from "express";
import Donation from "../models/donormodels/Donation.js";

const router = express.Router();

//  Add donation
router.post("/", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    res.status(201).json({
      message: "Donation saved",
      data: donation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Delete donation
router.delete("/:id", async (req, res) => {
    try {
      await Donation.findByIdAndDelete(req.params.id);
  
      res.json({ message: "Donation deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update status
router.put("/:id", async (req, res) => {
    try {
      const updated = await Donation.findByIdAndUpdate(
        req.params.id,
        { status: "Accepted" },
        { new: true }
      );
  
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;