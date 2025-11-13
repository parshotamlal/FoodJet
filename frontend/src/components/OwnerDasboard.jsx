import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import logo from "../assets/foodjet.png";
import { useNavigate } from "react-router-dom";

function OwnerDashboard() {
  const navigate =useNavigate()
  const { shopData } = useSelector((state) => state.owner);
  console.log(shopData)
  return (
    <div>
      <Navbar />
      {!shopData  && (
        <div className=" flex justify-center items-center p-4 sm:p-6">
          {console.log(shopData)}
          <div className=" w-full max-w-md bg-white shadow-lg rounded-2xl p-1 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="FoodJet Logo" className="w-35 h-auto " />
              <h2 className=" text-xl sm:2xl font-medium text-gray-700 mb-2"> Add Your Restaurant</h2>

              <p className="text-gray-500 text-center mb-6">
                Join our food delivery platform and reach thousands of hungray customers every day.
              </p>
              <button onClick={()=> navigate('/create-edit-shop')} className=" bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 "> Get Started</button>
            </div>
          </div>
        </div>
      )}


     {shopData && (
  <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
    <h6 className="text-left text-black">
      Home/{shopData.data.shop.city}/{shopData.data.shop.name}
    </h6>

<div className=" items-center justify-between p-4 w-[560px] h-70 bg-white shadow-lg rounded-2xl border border-orange-200 hover:shadow-orange-300 transition-shadow">
<h1 className=" ml-4 mb-2 text-black text-base font-bold w-[150px]">{shopData.data.shop.name} </h1>
  <div className="flex items-center gap-20 w-full">
    <img
      src={shopData.data.shop.image}
      alt="Shop"
      className="w-50 h-50 rounded-xl object-cover"
    />

     <h1 className="text-black text-base font-semibold w-[150px]">
      {shopData.data.shop.name}
    </h1>
    <p></p>
  </div>

</div>


<div className="flex flex-col justify-between p-5 w-[360px] bg-white shadow-xl rounded-2xl border border-orange-200 hover:shadow-orange-300 transition-all duration-300">

  <h1 className="text-black text-lg font-bold mb-2">
    Add Your Food
  </h1>

  <p className="text-gray-600 text-sm leading-relaxed mb-4">
    Share your delicious creation with our customers by adding them to the menu.
  </p>

  <button onClick={()=> navigate("/add-item")} className="mt-2 w-[120px] py-2 text-sm bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition">
    Add Item
  </button>

</div>


  </div>
)}

    </div>
  );
}

export default OwnerDashboard;

