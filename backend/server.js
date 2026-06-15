import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import connectDb from "./config/connectDB.js"
import cors from "cors"
import donationRoutes from "./routes/donation.routes.js"
import authRoutes from "./routes/auth.routes.js"
import organisationRoutes from "./routes/organisation.routes.js"
import adminRoutes from "./routes/admin.routes.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("ShareBowl backend is running");
});


app.use(express.json())
//parsing data
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
  }));

app.use(cookieParser())

app.use("/api/donation", donationRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/organisation",organisationRoutes)

app.use("/api/admin", adminRoutes);



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