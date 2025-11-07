import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. No token provided." });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeToken.userId; // attach user ID to request

    next(); 
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default isAuth;
