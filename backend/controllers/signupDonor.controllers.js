import bcrypt from "bcrypt";
import Donor from "../models/donormodels/Donor.models.js";
import validator from "validator";

export const signupDonor = async (req, res) => {
  try {
    const {
      donorName,
      email,
      phone,
      street,
      city,
      district,
      state,
      pincode,
      password,
    } = req.body;

    if (
      !donorName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !district ||
      !state ||
      !pincode ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanPincode = pincode.trim();
    const cleanCity = city.trim();
    const cleanDonorName = donorName.trim();

    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!validator.isMobilePhone(cleanPhone, "en-IN")) {
      return res.status(400).json({ message: "Invalid Indian phone number" });
    }

    if (!/^[1-9][0-9]{5}$/.test(cleanPincode)) {
      return res.status(400).json({ message: "Invalid pincode" });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (!validator.isLength(cleanDonorName, { min: 3, max: 50 })) {
      return res.status(400).json({
        message: "Donor name must be between 3 and 50 characters",
      });
    }

    if (!validator.matches(cleanCity, /^[A-Za-z\s]+$/)) {
      return res.status(400).json({
        message: "City name can only contain letters and spaces",
      });
    }

    const existingDonor = await Donor.findOne({ email: cleanEmail });

    if (existingDonor) {
      return res.status(400).json({
        message: "Donor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Donor.create({
      donorName: cleanDonorName,
      email: cleanEmail,
      phone: cleanPhone,
      street: street.trim(),
      city: cleanCity,
      district: district.trim(),
      state: state.trim(),
      pincode: cleanPincode,
      password: hashedPassword,
      isEmailVerified: true,
      role: "donor",
    });

    return res.status(201).json({
      message: "Donor registered successfully",
    });
  } catch (error) {
    console.log("DONOR SIGNUP ERROR:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Donor already exists",
      });
    }

    return res.status(500).json({
      message: error.message || "Server error",
    });
  }
};