import Donor from "../models/donormodels/Donor.models.js";
import Donation from "../models/donormodels/Donation.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const donorData = await Promise.all(
      donors.map(async (donor) => {
        const donationCount = await Donation.countDocuments({
          donor: donor._id,
        });

        return {
          ...donor._doc,
          donationCount,
        };
      })
    );

    res.status(200).json({
      donors: donorData,
    });
  } catch (error) {
    console.error("GET ALL DONORS ERROR:");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDonationsByLocation = async (req, res) => {
  try {
    const { state, district } = req.query;

    let filter = {};

    if (state) {
      filter["location.state"] = state;
    }

    if (district) {
      filter["location.district"] = district;
    }

    const donations = await Donation.find(filter)
      .populate("donor", "donorName email")
      .populate("organisation", "organisationName")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      donations,
    });
  } catch (error) {
    console.error("GET DONATIONS ERROR:");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPendingOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.find({
      isAdminVerified: false,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      organisations,
    });
  } catch (error) {
    console.error("GET PENDING ORGANISATIONS ERROR:");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);

    if (!organisation) {
      return res.status(404).json({
        message: "Organisation not found",
      });
    }

    organisation.isAdminVerified = true;

    await organisation.save();

    // Email should not break approval
    try {
      await sendEmail(
        organisation.email,
        "ShareBowl Registration Approved",
        `
        <h1>Welcome to ShareBowl 🎉</h1>

        <p>Hello ${organisation.organisationName},</p>

        <p>Your registration has been approved by our team.</p>

        <p>You can now log in and start managing food donations.</p>

        <br/>
        <p>Thank you,</p>
        <p>Team ShareBowl</p>
        `
      );
    } catch (emailError) {
      console.error("EMAIL ERROR (APPROVE):");
      console.error(emailError);
      console.error(emailError.message);
    }

    return res.status(200).json({
      message: "Organisation approved successfully",
    });
  } catch (error) {
    console.error("APPROVE ORGANISATION ERROR:");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findById(req.params.id);

    if (!organisation) {
      return res.status(404).json({
        message: "Organisation not found",
      });
    }

    await organisation.deleteOne();

    // Email should not break rejection
    try {
      await sendEmail(
        organisation.email,
        "ShareBowl Registration Update",
        `
        <h2>ShareBowl Registration Update</h2>

        <p>Hello ${organisation.organisationName},</p>

        <p>We are unable to approve your registration at this time.</p>

        <p>Please contact us to resolve the issue and apply again.</p>

        <p>Regards,<br>Team ShareBowl</p>
        `
      );
    } catch (emailError) {
      console.error("EMAIL ERROR (REJECT):");
      console.error(emailError);
      console.error(emailError.message);
    }

    return res.status(200).json({
      message: "Organisation rejected",
    });
  } catch (error) {
    console.error("REJECT ORGANISATION ERROR:");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      message: error.message,
    });
  }
};