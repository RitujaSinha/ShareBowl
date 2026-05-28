import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrgDonations, getDonationCounts, getOrganisationDashboard,updateDonationStatus } from "../controllers/OrganisationDashboard.controller.js";

import {
    //get all organisation list for daonor to donate
getAllOrganisations,} from "../controllers/getAllorganisation.controller.js";

const router = express.Router();

router.get("/all",getAllOrganisations);

//router for organization dashboard
/* DASHBOARD */
router.get("/dashboard", protect, getOrganisationDashboard);
/* DONATIONS */
router.get("/org-donations", protect, getOrgDonations);
/* STATUS */
router.put("/status/:id", protect, updateDonationStatus);
/* COUNTS */
router.get("/counts", protect, getDonationCounts);


export default router;