import Donor from "../models/donormodels/Donor.models.js";
import Donation from "../models/donormodels/Donation.js";
import Organisation from "../models/organisationmodels/Organisation.models.js";

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
      .populate(
        "organisation",
        "organisationName"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      donations,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getPendingOrganisations = async (req, res) => {
    try {
  
      const organisations =
        await Organisation.find({
          isAdminVerified: false,
        }).sort({
          createdAt: -1,
        });
  
      res.status(200).json({
        organisations,
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  };
  
  export const approveOrganisation = async (req, res) => {
    try {
  
      const organisation =
        await Organisation.findById(
          req.params.id
        );
  
      if (!organisation) {
  
        return res.status(404).json({
          message: "Organisation not found",
        });
      }
  
      organisation.isAdminVerified = true;
  
      await organisation.save();
  
      res.status(200).json({
        message: "Organisation approved successfully",
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  };
  
  export const rejectOrganisation = async (req, res) => {
    try {
  
      const organisation =
        await Organisation.findById(
          req.params.id
        );
  
      if (!organisation) {
  
        return res.status(404).json({
          message: "Organisation not found",
        });
      }
  
      await organisation.deleteOne();
  
      res.status(200).json({
        message: "Organisation rejected",
      });
  
    } catch (error) {
  
      console.log(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  };