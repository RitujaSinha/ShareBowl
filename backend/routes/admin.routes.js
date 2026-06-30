import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllDonors,
  getDonationsByLocation,
  getPendingOrganisations,
  approveOrganisation,
  rejectOrganisation,
} from "../controllers/admin.controllers.js";

const router = express.Router();

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

router.get("/donors", protect, adminOnly, getAllDonors);

router.get("/donations", protect, adminOnly, getDonationsByLocation);

router.get(
  "/organisations/pending",
  protect,
  adminOnly,
  getPendingOrganisations
);

router.patch(
  "/organisations/:id/approve",
  protect,
  adminOnly,
  approveOrganisation
);

router.delete(
  "/organisations/:id/reject",
  protect,
  adminOnly,
  rejectOrganisation
);

router.get(
  "/dashboard",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

export default router;