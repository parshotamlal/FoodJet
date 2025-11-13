import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    if (!name || !city || !state || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image: imageUrl,
      owner: req.userId,
    });
    console.log(shop)

    await shop.populate("owner","item");

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      shop,
    });
  } catch (error) {
    console.error("Create shop error:", error);
    return res.status(500).json({
      success: false,
      message: `Create shop error: ${error.message}`,
    });
  }
};




export const editShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image = null;

    let shop = await Shop.findOne({ owner: req.userId });

    // If new image uploaded, update it
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    if (!shop) {
      // Create new
      shop = await Shop.create({
        owner: req.userId,
        name,
        city,
        state,
        address,
        image,
      });
    } else {
      // Update existing
      const updateData = { name, city, state, address };
      if (image) updateData.image = image;

      shop = await Shop.findOneAndUpdate(
        { _id: shop._id },
        updateData,
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Shop saved successfully",
      shop,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user }); // ✅ Fix

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Shop fetched successfully",
      shop
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
