import express from "express";
import {
    addDonation,
    getMyDonations,
    getAllDonations,
    acceptDonation,
    deleteDonation,
  } from "../controllers/donation.controllers.js";
import { protect }from "../middleware/authMiddleware.js";
import { getDonationCounts } from "../controllers/getDonationCount.controller.js";

const router = express.Router();

router.post("/create",protect,addDonation);
router.get("/counts",protect,getDonationCounts);
router.get("/my-donations", protect, getMyDonations);
router.delete("/delete/:id", protect, deleteDonation);

router.get("/all-donations", protect, getAllDonations);
router.put("/donation/accept/:id", protect, acceptDonation);


export default router;