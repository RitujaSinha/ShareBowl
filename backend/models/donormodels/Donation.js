import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
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

    // Donation Category
    category: {
      type: String,
      enum: ["Food", "Grocery"],
      default: "Food",
    },

    // Food / Grocery details
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

    expiry: {
      type: Date,
    },

    brand: {
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

    // Pickup Details
    pickupSchedule: {
      date: {
        type: Date,
      },

      time: {
        type: String,
      },

      note: {
        type: String,
        trim: true,
      },
    },

    // Donation Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Pickup Scheduled",
        "Picked Up",
        "Completed",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;