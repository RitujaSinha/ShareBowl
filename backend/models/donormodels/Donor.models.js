import mongoose from "mongoose"
import { Schema } from "mongoose"

const donorSchema = new Schema({
    donorName:{
        type:String,
        required:true,
        trim:true
    },
    
    role:{
        type:String,
        default:"donor",
        immutable:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    isEmailVerified:{
        type: Boolean,
        default: false
    },

    phone:{
        type:Number,
        immutable:true,
        maxLength:10,
        minLength:10,
    },

    street:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
    },

    city:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
    },

    district:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
    },

    state:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
    },

    pincode:{
        type:Number,
        minLength:6,
        maxLength:6,
        required:true 
    },


    password: {
        type:String,
        required:true
    },

},{timestamps:true})

const Donor = mongoose.model("Donor",donorSchema);
export default Donor;