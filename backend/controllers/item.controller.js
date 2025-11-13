import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }
    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });
    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      shop,
    }); 

    console.log(item)
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error while creating item: ${error.message}`,
    });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findOneAndUpdate(itemId, {
      name,
      category,
      foodType,
      price,
      image,
    },{new:true})

    if(!item) {
        return res.status(400).json({ message: "Item not found" });

    }
    return res.status(200).json({ message: "Item  found sucessfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error at edit" });
  }
};
