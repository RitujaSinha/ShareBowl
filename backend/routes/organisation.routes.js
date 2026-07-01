import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getOrgDonations,
  getDonationCounts,
  getOrganisationDashboard,
  updateDonationStatus,
  schedulePickup,
} from "../controllers/OrganisationDashboard.controller.js";

import {
  getAllOrganisations,
} from "../controllers/getAllorganisation.controller.js";

const router = express.Router();

// All approved organisations (for donor)
router.get("/all", getAllOrganisations);

// Organisation Dashboard
router.get("/dashboard", protect, getOrganisationDashboard);

// Organisation Donations
router.get("/org-donations", protect, getOrgDonations);

// Update Donation Status
router.put("/status/:id", protect, updateDonationStatus);

// Dashboard Counts
router.get("/counts", protect, getDonationCounts);

router.put("/pickup/:id", protect, schedulePickup);

export default router;