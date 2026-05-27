export const getDonationCounts =
async (req, res) => {

  try {

    // Total Donations
    const totalDonations = await Donation.countDocuments({donor: req.user.userId,});

    // Accepted Donations
    const acceptedDonations = await Donation.countDocuments({donor: req.user.userId, status: "Accepted",});

    // Pending Donations
    const pendingDonations = await Donation.countDocuments({donor: req.user.userId, status: "Pending",});

    return res.status(200).json({
      success: true,
     totalDonations,acceptedDonations,pendingDonations
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({success: false, message: "Server error",});
  }
};