import Donor from "../models/donormodels/Donor.models.js";
import Donation from "../models/donormodels/Donation.js";

export const getAllDonors = async (req, res) => {
  try {

    const donors = await Donor.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const donorData = await Promise.all(
      donors.map(async (donor) => {

        const donationCount =
          await Donation.countDocuments({
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

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};