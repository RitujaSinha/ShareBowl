import express from "express";

import {
    //get all organisation list for daonor to donate
  getAllOrganisations,
} from "../controllers/getAllorganisation.controller.js";

const router = express.Router();

router.get(
  "/all",
  getAllOrganisations
);

export default router;