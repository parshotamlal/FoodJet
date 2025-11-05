import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db =process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db||process.env.MONGODB_URI);
    console.log(" Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
};

export default connectDB;
