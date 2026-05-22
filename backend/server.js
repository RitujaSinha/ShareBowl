import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDB.js"
import cors from "cors"

dotenv.config();

const app = express();


//parsing data
app.use(cors({
    origin:""
}))

app.use(express.json())

const PORT = process.env.PORT || 6000

app.listen(PORT, ()=> {
    try {
        connectDb();
        console.log(`Server is running on port ${PORT}`)
    } 
    catch (error) {
        console.log(`Couldn't Connect to Server`)
    }
  })