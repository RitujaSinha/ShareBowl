import express from "express";
import { login } from "../controllers/auth.controllers.js";
import { signupOrganisation } from "../controllers/signupOrganisation.controllers.js";
import { signupDonor } from "../controllers/signupDonor.controllers.js";

const router = express.Router();

router.post("/signup/donor",signupDonor)
router.post("/signup/organisation",signupOrganisation)

router.post("/login", login);

export default router;