import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin",
        immutable:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    password: {
        type:String,
        required:true
    },

});

const Admin = mongoose.models("Admin",adminSchema);
module.exports = Admin; 