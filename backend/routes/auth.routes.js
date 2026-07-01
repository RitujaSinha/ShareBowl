import express from "express";
import {
    getMe,
    login,
    logout,
    forgotPassword,
    resetPassword,
  } from "../controllers/auth.controllers.js";
import { signupOrganisation } from "../controllers/signupOrganisation.controllers.js";
import { signupDonor } from "../controllers/signupDonor.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/signup/donor", signupDonor);
router.post("/signup/organisation", signupOrganisation);

router.post("/login", login);
router.post("/logout",logout)

router.get("/me",protect,getMe);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", resetPassword);

export default router;