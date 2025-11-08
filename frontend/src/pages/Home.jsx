import React from "react";
import { useSelector } from "react-redux";
import UserDasboard from "../components/UserDasboard";
import OwnerDasboard from "../components/OwnerDasboard";
import DeliveryBoyDasboard from "../components/DeliveryBoyDasboard";
import Navbar from "../components/Navbar";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className=" w-100vw min-h-[100vh] pt-[100vh] flex  flex-col items-center bg-[#fff9f6]">
        <Navbar />
      {userData.role == "user" && <UserDasboard />}
      {userData.role == "owner" && <OwnerDasboard />}
      {userData.role == "deliveryBoy" && <DeliveryBoyDasboard />}
    </div>
  );
}

export default Home;
