import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({

  // Donor who created donation
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },

  // Selected organisation
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },

  // Food details
  foodType: {
    type: String,
    required: true,
    trim: true,
  },

  quantity: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  // Donor location
  location: {

    lat: {
      type: Number,
      required: true,
    },
  
    lng: {
      type: Number,
      required: true,
    },
  
    city: {
      type: String,
    },
  
    district: {
      type: String,
    },
  
    state: {
      type: String,
    },
  
  },

  // Donation status
  status: {

    type: String,

    enum: [
      "Pending",
      "Accepted",
      "Completed",
      "Rejected",
    ],

    default: "Pending",
  },

}, {
  timestamps: true,
});

const Donation =
mongoose.model("Donation", donationSchema);

export default Donation;