import mongoose from "mongoose";
import { Schema } from "mongoose";

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
        trim:true
    },

    isEmailVerified:{
        type:Boolean,
        default:false
    },

    isAdminVerified:{
        type:Boolean,
        default:false
    },

    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        trim:true
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
        type:String,
        required:true,
        minlength:6,
        maxlength:6,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    resetPasswordToken: {
        type: String,
    },
      
    resetPasswordExpires: {
        type: Date,
    },

},{
    timestamps:true
});

const Organisation =
mongoose.model("Organisation", organisationSchema);

export default Organisation;