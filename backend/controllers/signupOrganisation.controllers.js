import bcrypt from "bcrypt";
import Organisation from "../models/organisationmodels/Organisation.models.js";
import { trusted } from "mongoose";

export const signupOrganisation = async (req, res) => {

    try {

        const {
            organisationName,
            organisationID,
            organisationOwner,
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
        if ( !organisationName || !organisationID || !organisationOwner || !email || !phone ||!street || !city ||  !district || !state || !pincode || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //validate user input
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Not a valid email"});
        }
        if(!validator.isMobilePhone(phone,"en-IN")){
            return res.status(400).json({message: "Invalid phone number"})
        }
        if(!validator.isPostalCode(pincode,"IN")){
            return res.status(400).json({message: "Invalid pin code"});
        }
        if(!validator.isStrongPassword(password,{minLength:6})){
            return res.status(400).json({message:"Pasword must be of 6+ characters"});
        }
        if(!validator.isLength(organisationName,{min:3, max:70})){
            return res.status(400).json({message:"Organisation name must be between 3 and 70 length"})
        }
        if (!validator.matches(city.trim(), /^[A-Za-z\s]+$/)) {
            return res.status(400).json({
            message: "City name can only contain letters and spaces",});
        }


        // check existing email
        const existingEmail =
            await Organisation.findOne({ email });

        if (existingEmail) {

            return res.status(400).json({
                message: "Organisation already exists with this email"
            });
        }

        // check organisation id
        const existingOrganisationID =
            await Organisation.findOne({ organisationID });

        if (existingOrganisationID) {

            return res.status(400).json({
                message: "Organisation ID already exists"
            });
        }

        // hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // create organisation
        const organisation =
            await Organisation.create({

                organisationName,
                organisationID,
                organisationOwner,

                email,
                phone,

                street,
                city,
                district,
                state,
                pincode,

                password: hashedPassword,

                role: "organisation",

                isEmailVerified: true,

                isAdminVerified: false
            });

        return res.status(201).json({

            message:
                "Registration request submitted successfully. Wait for admin approval.",

            organisation
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};