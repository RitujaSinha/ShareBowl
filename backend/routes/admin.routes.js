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

router.get(
  "/donors",
  protect,
  getAllDonors
);

router.get(
    "/donations",
    protect,
    getDonationsByLocation
  );

  router.get(
    "/organisations/pending",
    protect,
    getPendingOrganisations
  );
  
  router.patch(
    "/organisations/:id/approve",
    protect,
    approveOrganisation
  );
  
  router.delete(
    "/organisations/:id/reject",
    protect,
    rejectOrganisation
  );

export default router;