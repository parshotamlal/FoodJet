import { upload } from "../middleware/multer.js"
import Shop from "../models/shop.model"
import uploadOnCloudinary from "../utils/cloudinary"

export const createShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image = null;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image,
      owner: req.userId,
    });

    await shop.populate("owner");

    return res.status(200).json({
      success: true,
      message: "Shop created successfully",
      shop,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Create shop error: ${error}`
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