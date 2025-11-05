import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,   
    trim: true       
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,

  },
  mobile:{
    type:String,
    required:true
  },

  role:{
    type:String,
    enum:["user","owner","deliveryBoy"],
    required:true,
  }


}, { timestamps: true }); 

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
