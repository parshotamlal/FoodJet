import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import logo from "../assets/foodjet.png";
import axios from "axios";
import { serverUrl } from "../Url/ServerUrl";
import { setShopData } from "../redux/shopSlice";

function CreateEditShop() {

  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  const { currentCity,currentState } = useSelector((state) => state.user);
  const [name,setName] = useState(shopData?.name ||"")
  const [address,setAddress] =useState(shopData?.address ||"")
  const [city,setCity] =useState(shopData?.city ||currentCity)
  const [state,setState] =useState(shopData?.state ||currentState)
   const [frontendImage,setFrontendImage] =useState(shopData?.image ||null)
   const [backendImage,setBackendImage] =useState(null)
   const dispatch = useDispatch()
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
    const formData= new FormData()
    formData.append("name",name)
    formData.append("address",address)
    formData.append("city",city)
    formData.append("state",state)
    if(backendImage) {
      formData.append("image",backendImage)
    }
    const result = await axios.post(`${serverUrl}/api/shop/create-shop`,formData,{withCredentials:true})
    dispatch(setShopData(result))
    console.log(result.data)

    
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
              {shopData ? "Edit the Shop" : "Add the Shop"}
            </h2>
          </div>


          <form className=" space-y-5" onSubmit={handleSubmit}>
            <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1" >Name </label>
                <input type="text" placeholder="Enter Shop Name" className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={(e)=>setName(e.target.value)} value={name} />
            </div>

       <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Shop Image
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

             <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1" >Address </label>
                <input type="text" placeholder="Enter Shop Address" className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={(e)=> setAddress(e.target.value)} value={address} />
            </div>

            <div className=" flex ">
                 <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1" >City </label>
                <input type="text" placeholder="Enter Shop City" className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={(e)=> setCity(e.target.value)} value={city} />
            </div>

             <div>
                <label className=" block text-sm font-medium text-gray-700 mb-1" >State </label>
                <input type="text" placeholder="Enter Shop State" className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={(e)=> setState(e.target.value)} value={state} />
            </div>
            </div>

            <button className=" w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEditShop;
