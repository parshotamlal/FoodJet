import React, { useState } from "react";
import logo from "../assets/foodjet.png";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { userData,city } = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <header className="w-full h-[70px] fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8">
      {/* LOGO */}
      <div onClick={() => navigate("/")} className="cursor-pointer select-none">
        <img
          src={logo}
          alt="FoodJet Logo"
          className="h-[155px] object-contain"
        />
      </div>

      {/* CENTER (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-8 w-[55%] justify-center">
        {/* Location */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <IoLocationSharp className="text-[#ff4d2d] text-xl" />
          <p className="font-semibold text-gray-800">{city}</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-[60%]">
          <FaSearch className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search for restaurant, item or more"
            className="w-full h-[38px] px-3 border border-[#ff4d2d] rounded outline-none text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">
        {/* Search icon for mobile */}
        <FaSearch className="text-[#ff4d2d] text-xl md:hidden" />

        {/* Cart */}
        <div className="relative cursor-pointer">
          <LuShoppingCart className="text-[#ff4d2d] text-2xl" />
          <span className="absolute -top-1 -right-2 bg-[#ff4d2d] text-white text-[10px] font-semibold rounded-full h-[16px] w-[16px] flex items-center justify-center">
            0
          </span>
        </div>

        {/* My Orders (Hide on mobile) */}
        <button
          onClick={() => navigate("/orders")}
          className="hidden md:block px-4 py-2 text-sm font-semibold text-[#ff4d2d] border border-[#ff4d2d] rounded-lg hover:bg-[#ff4d2d] hover:text-white transition-all duration-200"
        >
          My Orders
        </button>

        {/* User Avatar */}
        <div
          onClick={() => setProfile(!profile)}
          className="h-[36px] w-[36px] rounded-full bg-[#ff4d2d] text-white flex items-center justify-center text-sm font-bold"
        >
          {userData?.user?.fullName?.slice(0, 1).toUpperCase()}
        </div>

        {profile && (
          <div className="absolute top-[75px] right-4 bg-white shadow-lg border border-gray-200 rounded-lg w-[180px] py-3 flex flex-col gap-2 z-[999]">

             <button className="text-gray-700 hover:text-[#ff4d2d] font-medium px-4 text-left">
              {userData?.user?.fullName}
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="text-gray-700 hover:text-[#ff4d2d] font-medium px-4 text-left"
            >
              My Orders
            </button>

            <button className="text-gray-700 hover:text-[#ff4d2d] font-medium px-4 text-left">
              Profile
            </button>

            <button className="text-gray-700 hover:text-[#ff4d2d] font-medium px-4 text-left">
              Logout
            </button>
          </div>
        )}

        {/* Hamburger Menu - Only Mobile */}
        <HiMenu
          onClick={() => setOpenMenu(!openMenu)}
          className="text-3xl text-[#ff4d2d] cursor-pointer md:hidden"
        />
      </div>

      {/* Mobile Slide Menu */}
      {openMenu && (
        <div className="absolute top-[70px] right-0 w-[65%] bg-white shadow-lg p-5 flex flex-col gap-5 md:hidden">
          <button
            onClick={() => navigate("/orders")}
            className="text-[#ff4d2d] font-semibold"
          >
            My Orders
          </button>
          <button className="text-[#ff4d2d] font-semibold">Profile</button>
          <button className="text-[#ff4d2d] font-semibold">Logout</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
