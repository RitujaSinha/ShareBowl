import mongoose from "mongoose"
import { Schema } from "mongoose"

const organisationSchema = new Schema({
    organisationName:{
        type:String,
        required:true,
        trim:true,
    },

    role:{
        type:String,
        default:"organisation",
        immutable:true
    },

    organisationID:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    organisationOwner:{
        type:String,
        required:true,
        trim:true,
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
    isAdminVerified: {
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

const Organisation = mongoose.model("Organisation",organisationSchema);
module.exports = Organisation