import Donation from "../models/donormodels/Donation.js";

/* ---------------- DASHBOARD ---------------- */
export const getOrganisationDashboard = async (req, res) => {
  try {
    const organisationId = req.user.userId;

    const donations = await Donation.find({
      organisation: organisationId,
    })
      .sort({ createdAt: -1 })
      .populate("donor", "name");

    const total = donations.length;

    const accepted = donations.filter(
      (d) => d.status === "Accepted"
    ).length;

    const pending = donations.filter(
      (d) => d.status === "Pending"
    ).length;

    res.status(200).json({
      organisationName: req.user.name || "Organisation",
      totalDonations: total,
      pendingDonations: pending,
      acceptedDonations: accepted,
      recent: donations.slice(0, 5),
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- ALL DONATIONS ---------------- */
export const getOrgDonations = async (req, res) => {
  try {
    const orgId = req.user.userId;

    const donations = await Donation.find({
      organisation: orgId,
    })
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = status;
    await donation.save();

    res.json({
      success: true,
      message: "Status updated",
      donation,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- COUNTS (FIXED) ---------------- */
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

    res.json({
      totalDonations: total,
      acceptedDonations: accepted,
      pendingDonations: pending,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};