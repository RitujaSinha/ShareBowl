import express from "express";
import { login,logout } from "../controllers/auth.controllers.js";
import { signupOrganisation } from "../controllers/signupOrganisation.controllers.js";
import { signupDonor } from "../controllers/signupDonor.controllers.js";

const router = express.Router();


router.post("/signup/donor", signupDonor);
router.post("/signup/organisation", signupOrganisation);

router.post("/login", login);
router.post("/logout",logout)

export default router;