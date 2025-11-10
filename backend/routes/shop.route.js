import express from "express"
import isAuth from "../middleware/isAuth"
import { createShop, editShop } from "../controllers/shop..controller"
import { upload } from "../middleware/multer"



const shopRouter =express.Router()



shopRouter.post("/create-shop",isAuth,upload.single("image"),createShop)
shopRouter.put("/update-shop/:id",isAuth,isAuth,upload.single("image"),editShop)
export default shopRouter