import Donation from "../models/donormodels/Donation.js";
import validator from "validator"
export const addDonation =
async (req, res) => {

  try {

    const {

      organisation,
      foodType,
      quantity,
      description,
      expiry,
      brand,
      category,
      location,

    } = req.body;

    // Validation
    if ( !organisation || !foodType ||!quantity) {
      return res.status(400).json({ message:"Organisation, food type and quantity are required"});
    }

    if(!validator.isInt(quantity.toString(),{min:1})){
      return res.status(400).json({message:"Quantity must be a positive number"});
    }
    
    if (category === "Food") {
      const expirydate = new Date(expiry);
    
      if (isNaN(expirydate.getTime())) {
        return res.status(400).json({ message: "Invalid expiry date" });
      }
    
      if (expirydate <= new Date()) {
        return res.status(400).json({ message: "Food is already expired" });
      }
    }

    // Create Donation
    const donation =
    await Donation.create({

      donor:
        req.user.userId,

      organisation,

      foodType,

      quantity,

      description,

      expiry,

      brand,

      category,

      location,

    });

    return res.status(201).json({

      message:
        "Donation added successfully",

      donation,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Server error",

    });
  }
};

export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({donor: req.user.userId,})
      .populate(
        "organisation",
        "organisationName"
      )

      .sort({
        createdAt: -1,
      });

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

export const getAllDonations = async (req, res) => {
  try {
    if (req.user.role !== "organisation") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const donations = await Donation.find()
      .populate("donor", "donorName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      donations,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const acceptDonation = async (req, res) => {
  try {
    if (req.user.role !== "organisation") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const { id } = req.params;

    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found",
      });
    }

    donation.status = "Accepted";

    await donation.save();

    return res.status(200).json({
      message: "Donation accepted",
      donation,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteDonation = async (req, res) => {
    try {
      const { id } = req.params;
  
      const donation = await Donation.findById(id);
  
      if (!donation) {
        return res.status(404).json({
          message: "Donation not found",
        });
      }

      if (donation.status === "Accepted") {
        return res.status(400).json({
          message: "Accepted donations cannot be deleted",
        });
      }
  
      if (donation.donor.toString() !== req.user.userId) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }
  
      await donation.deleteOne();
  
      return res.status(200).json({
        message: "Donation deleted successfully",
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };