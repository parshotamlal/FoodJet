import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",   // frontend origin
  credentials: true,                 // ✅ correct spelling
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser()); // ✅ Must CALL the function


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

connectDB();

app.listen(port, () => {
  console.log("✅ Server is running on port:", port);
});



