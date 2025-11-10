import express from "express"
import isAuth from "../middleware/isAuth"
import { addItem, editItem } from "../controllers/item.controller"
import { upload } from "../middleware/multer"



const itemRouter =express.Router()



itemRouter.post("/additem",isAuth,upload.single("image"),addItem)
itemRouter.put("/updateitem",isAuth,upload.single("image"),editItem)
export default itemRouter