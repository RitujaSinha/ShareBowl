import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: String,

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["donor", "ngo", "admin"],
      default: "donor",
    },

    address: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AuthUser", authUserSchema);