// Database connection using Mongoose
import "dotenv/config";
import mongoose from 'mongoose';
import assert from "assert";

// import models

import { 
    Doctor,
    Patient,
    Appointment,
    Prescription,
    Admin,
    Profile
 } from "../models/schema";

assert(process.env.MONGODB_ATLAS_DB, "DATABASE_URL is not set in the .env file");

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_ATLAS_DB)
.then(() => {
    console.log("Connected to database successfully");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Export mongoose connection
const db = mongoose.connection;

export default db;