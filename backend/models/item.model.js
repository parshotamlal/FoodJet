import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  category: {
    type: String,
    enum: [
      "North Indian",
      "South Indian",
      "Punjabi",
      "Gujarati",
      "Rajasthani",
      "Bengali",
      "Maharashtrian",
      "Hyderabadi",
      "Mughlai",
      "Street Food",
      "Chinese",
      "Pizza",
      "Burgers",
      "Sandwich & Rolls",
      "Biryani",
      "Snacks & Fast Food",
      "others"
    ],
    required:true
  },
  price:{
    type:String,
    min:0,
   required:true
},
foodType:{
    type:String,
    required:true,
    enum:[
        "veg",
        "non veg"
    ]
}

},{timestamps:true})

const Item = mongoose.model("Item",itemSchema)
export default Item
