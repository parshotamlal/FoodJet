import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

 const getToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Error generating token:", error);
    return null;
  }
};

export default getToken
