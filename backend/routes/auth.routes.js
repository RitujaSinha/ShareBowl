import express from "express";
import { login,logout } from "../controllers/auth.controllers.js";
import { signupOrganisation } from "../controllers/signupOrganisation.controllers.js";
import { signupDonor } from "../controllers/signupDonor.controllers.js";

import { 
  addDonation, 
  getMyDonations, 
  getAllDonations, 
  acceptDonation 
} from "../controllers/donation.controllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/signup/donor", signupDonor);
router.post("/signup/organisation", signupOrganisation);

router.post("/login", login);
router.post("/logout",logout)


router.post("/donation", protect, addDonation);
router.get("/my-donations", protect, getMyDonations);


router.get("/all-donations", protect, getAllDonations);
router.put("/donation/accept/:id", protect, acceptDonation);

export default router;