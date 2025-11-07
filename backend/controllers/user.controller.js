import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user; // ✅ from isAuth middleware

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID missing in request",
      });
    }

    const user = await User.findById(userId).select("-password"); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Get current user error",
      error: error.message,
    });
  }
};
