import bcrypt from "bcrypt";
import Donor from "../models/donormodels/Donor.models.js"
import Organisation from "../models/organisationmodels/Organisation.models.js"
import Admin from "../models/admin.models.js"
import generateToken from "../utils/generateToken.js"

export const login  = async (req,res) => {
    try {
        const {role, email, password} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({message:"All fields are required"})
        }

        //get user
        //if admin login
        if(role === "admin"){
            const admin = await Admin.findOne({email})
            if(!admin){
                return res.status(401).json({message:"Wrong credentials"});
            }

            const isMatch = await bcrypt.compare(password,admin.password);
            // console.log(admin.password, password)
            if(!isMatch){
                return res.status(401).json({message:"Wrong credentials"});
            }
            const token = generateToken(admin);
            return res.status(200).json({
                message: "Login Successfull",
                token,
                id: admin._id,
                email:admin.email,
                role:admin.role
            })

        }

        //if donor logins..
        else if(role === "donor"){
            const donor = await Donor.findOne({email})
            if(!donor){
                return res.status(401).json({message:"Wrong credentials"});
            }

            if(!donor.isEmailVerified){
                return res.status(401).json({message:"Wrong credentials"});
            }

            const isMatch = await bcrypt.compare(password,donor.password);
            if(!isMatch){
                return res.status(401).json({message:"Wrong credentials"});
            }

            const token = generateToken(donor);
            return res.status(200).json({
                message: "Login Successfull",
                token,
                id: donor._id,
                email:donor.email,
                role:donor.role
            })

        }

        //if organisation logins
        else if(role === 'organisation'){
            const organisation = await Organisation.findOne({email})
            if(!organisation){
                return res.status(401).json({message:"Wrong credentials"});
            }
            if(!organisation.isEmailVerified){
                return res.status(401).json({message:"Wrong credentials"});
            }

            if(!organisation.isAdminVerified){
                return res.status(403).json({message:"Your verification is pending. Kindly wait or contact the owner."})
            }

            const isMatch = await bcrypt.compare(password,organisation.password);
            if(!isMatch){
                return res.status(401).json({message:"Wrong credentials"});
            }

            const token = generateToken(organisation);
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: organisation._id,
                    email: organisation.email,
                    role: organisation.role
                }
            });
        }


        else{
            res.status(400).json({message:"Invalid role!"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error!"})
    }
}
