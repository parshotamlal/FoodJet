import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import logo from "../assets/foodjet.png";
import axios from "axios";
import { serverUrl } from "../Url/ServerUrl";
import { setShopData } from "../redux/shopSlice";

function AddItem() {
  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const categories = [
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
    "others",
  ];
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const dispatch = useDispatch();
  const handleImage = (e) => {
    const file = e.target.files[0]; // ✅ use 'files[0]' (not 'file')
    if (file) {
      setBackendImage(file); // Save the actual file for backend upload
      setFrontendImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("foodType", foodType);
      formData.append("category", category);

      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setShopData(result));
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex justify-centern flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className=" absolute top-[20px] left-[20px] z-[10px] mb-[10px]"
        onClick={() => navigate()}
      >
        <FaArrowLeftLong className=" text-[25px] text-[#ff4d2d]" />
      </div>

      <div className=" max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div>
          <div className=" flex flex-col items-center mb-6">
            <img
              src={logo}
              alt="FoodJet Logo"
              className="h-[155px] object-contain"
            />

            <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-2">
              Add Food Item
            </h2>
          </div>

          <form className=" space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                Name{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Shop Name"
                className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                Price{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Shop Name"
                className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                Select Food Type
              </label>

              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFoodType(e.target.value)}
                value={foodType}
              >
                <option value="veg">veg</option>
                <option value="non veg">non veg</option>
              </select>
            </div>

            <div>
              <label className=" block text-sm font-medium text-gray-700 mb-1">
                Select Category
              </label>

              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select Category</option>

                {categories.map((cate, index) => (
                  <option value={cate} key={index}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleImage}
              />

              {frontendImage && (
                <div className="mt-4">
                  <img
                    src={frontendImage}
                    alt="Shop Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <button className=" w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
