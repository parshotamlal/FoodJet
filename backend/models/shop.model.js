import mongoose from "mongoose";

// Define the schema
const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    city:{
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
        required:false
    }

}, { timestamps: true }); 

// Create the model
const Shop = mongoose.model("Shop", shopSchema);

export default Shop;

