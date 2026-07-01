import Donation from "../models/donormodels/Donation.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";

/* ---------------- DASHBOARD ---------------- */
export const getOrganisationDashboard = async (req, res) => {
  try {

    const organisationId = req.user.userId;

    const organisation = await Organisation.findById(organisationId).select(
      "-password"
    );

    console.log("ORG DATA:", organisation);

    if (!organisation) {
      return res.status(404).json({
        message: "Organisation not found",
      });
    }

    const donations = await Donation.find({
      organisation: organisationId,
    })
      .sort({ createdAt: -1 })
      .populate("donor", "donorName name email");

    const total = donations.length;

    const accepted = donations.filter(
      (d) => d.status === "Accepted"
    ).length;

    const pending = donations.filter(
      (d) => d.status === "Pending"
    ).length;

    return res.status(200).json({
      organisationName: organisation.organisationName,
      email: organisation.email,
      phone: organisation.phone,
      contactNumber: organisation.contactNumber,
      address: organisation.address,
      location: organisation.location,
      city: organisation.city,
      district: organisation.district,
      state: organisation.state,
      isAdminVerified: organisation.isAdminVerified,

      totalDonations: total,
      pendingDonations: pending,
      acceptedDonations: accepted,
      recent: donations.slice(0, 5),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ---------------- ALL DONATIONS ---------------- */
export const getOrgDonations = async (req, res) => {
  try {
    const orgId = req.user.userId;

    const donations = await Donation.find({
      organisation: orgId,
    })
      .populate("donor", "donorName name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ---------------- STATUS UPDATE ---------------- */
export const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    if (donation.organisation.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    donation.status = status;
    await donation.save();

    return res.json({
      success: true,
      message: "Status updated",
      donation,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

/* ---------------- COUNTS ---------------- */
export const getDonationCounts = async (req, res) => {
  try {
    const orgId = req.user.userId;

    const total = await Donation.countDocuments({
      organisation: orgId,
    });

    const accepted = await Donation.countDocuments({
      organisation: orgId,
      status: "Accepted",
    });

    const pending = await Donation.countDocuments({
      organisation: orgId,
      status: "Pending",
    });

    return res.json({
      totalDonations: total,
      acceptedDonations: accepted,
      pendingDonations: pending,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const schedulePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, note } = req.body;

    if (!date || !time) {
      return res.status(400).json({
        message: "Pickup date and time are required",
      });
    }

    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    if (donation.organisation.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (donation.status !== "Accepted") {
      return res.status(400).json({
        message: "Pickup can be scheduled only after accepting donation",
      });
    }

    donation.status = "Pickup Scheduled";
    donation.pickupSchedule = { date, time, note };

    await donation.save();

    return res.status(200).json({
      message: "Pickup scheduled successfully",
      donation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};