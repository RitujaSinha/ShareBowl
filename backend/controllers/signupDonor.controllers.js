import bcrypt from "bcrypt";
import Donor from "../models/donormodels/Donor.models.js";
import generateToken from "../utils/generateToken.js"; 

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
            password
        } = req.body;

        // validation
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
                message: "All fields are required"
            });
        }

        // existing donor
        const existingDonor =
            await Donor.findOne({ email });

        if (existingDonor) {

            return res.status(400).json({
                message:
                    "Donor already exists"
            });
        }

        // hash password
        const hashedPassword =  await bcrypt.hash(password, 10);

        // create donor
        const donor =
            await Donor.create({

                donorName,

                email,

                phone,

                street,
                city,
                district,
                state,
                pincode,
                password: hashedPassword,
                isEmailVerified:true,


                role: "donor",
            });

        return res.status(201).json({

            message:
                "Donor registered successfully",

            // donor
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};