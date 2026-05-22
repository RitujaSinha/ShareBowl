import mongoose from "mongoose";

const connectDb = async ()=> {
    try{
        if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined in .env");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected")
    }catch(err){
        console.error(`Databse error ${err}`)
    }
}

export default connectDb;