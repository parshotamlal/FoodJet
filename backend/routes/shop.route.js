// import express from "express"
// import isAuth from "../middleware/isAuth.js"

// import { upload } from "../middleware/multer.js"
// import { createShop, editShop, getMyShop } from "../controllers/shop.controller.js"

// const shopRouter = express.Router()

// shopRouter.post("/create-shop", isAuth, upload.single("image"), createShop)
// shopRouter.put("/update-shop/:id", isAuth, upload.single("image"), editShop)
// shopRouter.get("/get-myshop/:id", isAuth, getMyShop)

// export default shopRouter

import express from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { createShop, editShop, getMyShop } from "../controllers/shop.controller.js";

const shopRouter = express.Router();

// Create a new shop
shopRouter.post("/create-shop", isAuth, upload.single("image"), createShop);

// Update shop details
shopRouter.put("/update-shop/:id", isAuth, upload.single("image"), editShop);

// Get a specific shop by ID (owned by logged-in user)
shopRouter.get("/get-myshop/:id", isAuth, getMyShop);

export default shopRouter;

