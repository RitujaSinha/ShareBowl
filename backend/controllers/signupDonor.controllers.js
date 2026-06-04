import bcrypt from "bcrypt";
import Donor from "../models/donormodels/Donor.models.js";
import generateToken from "../utils/generateToken.js"; 
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
            password
        } = req.body;

        // validation
        if ( !donorName || !email || !phone || !street || !city || !district || !state || !pincode || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //vlidate data
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid Email"})
        }
        if(!validator.isMobilePhone(phone,"en-IN")){
            return res.status(400).json({message:"Invalid phone no."})
        }
        if(!validator.isPostalCode(pincode,"IN")){
            return res.status(400).json({message:"Invalid Pincode"});
        }
        if(!validator.isStrongPassword(password,{minLength:6})){
            return res.status(400).json({message:"Password must be of 6 length"})
        }
        if(!validator.isLength(donorName.trim(), {min:3, max:50})){
            return res.status(400).json({message:"Donor name must be between 3 and 50 characters."})
        }
        if (!validator.matches(city.trim(), /^[A-Za-z\s]+$/)) {
            return res.status(400).json({
            message: "City name can only contain letters and spaces",});
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