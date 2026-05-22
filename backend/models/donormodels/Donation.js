import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  type: String,
  quantity: String,
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  status: {
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;