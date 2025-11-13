// import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"

// const uploadOnCloudinary = async (file) => {
//     cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_SECRET_KEY
// });
//     try {

//        const result = await cloudinary.uploader.upload(file)
//        await fs.unlinkSync(file)
//        return result.secure_url

//     }catch(error) {
//         fs.unlinkSync(file)
//         console.log(error)

//     }
// }
// export default uploadOnCloudinary


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "shops", // optional folder name
    });
    fs.unlinkSync(localFilePath); // remove local file
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
