import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllDonors } from "../controllers/admin.controllers.js";

const router = express.Router();

router.get(
  "/donors",
  protect,
  getAllDonors
);

export default router;