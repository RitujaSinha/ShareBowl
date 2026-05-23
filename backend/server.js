import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDB.js"
import cors from "cors"
// import donationRoutes from "./routes/donationRoutes.js"
import authRoutes from "./routes/auth.routes.js"
dotenv.config();

const app = express();


//parsing data
app.use(cors({
    origin: "http://localhost:5173"
  }));

app.use(express.json())

// app.use("/api/donations", donationRoutes);
app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    try {
        connectDb();
        console.log(`Server is running on port ${PORT}`)
    } 
    catch (error) {
        console.log(`Couldn't Connect to Server`)
    }
  })