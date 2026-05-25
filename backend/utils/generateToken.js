import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateToken(user){
    console.log("ji"+ process.env.JWT_SECRET)
    return jwt.sign({
        userId: user._id,
        role:user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );
};