import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json()); // to parse req.body
// allow larger JSON payloads (images sent as base64 data URLs)
// app.use(express.json({ limit: "10mb" })); // to parse req.body
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
