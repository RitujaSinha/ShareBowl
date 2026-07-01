import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import cors from "cors";
import donationRoutes from "./routes/donation.routes.js";
import authRoutes from "./routes/auth.routes.js";
import organisationRoutes from "./routes/organisation.routes.js";
import adminRoutes from "./routes/admin.routes.js";

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const app = express();

app.get("/", (req, res) => {
  res.send("ShareBowl backend is running");
});

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://share-bowl.netlify.app",
      "https://amazing-centaur-e9d2b5.netlify.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/donation", donationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/organisation", organisationRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();