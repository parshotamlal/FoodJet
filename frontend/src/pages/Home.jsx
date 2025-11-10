import React from "react";
import { useSelector } from "react-redux";
import UserDasboard from "../components/UserDasboard";
import OwnerDasboard from "../components/OwnerDasboard";
import DeliveryBoyDasboard from "../components/DeliveryBoyDasboard";


function Home() {
  const { userData } = useSelector((state) => state.user);
  console.log("userData in Home:", userData);

  if (!userData) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
     <div className="w-full min-h-screen pt-20 flex flex-col items-center bg-[#fff9f6]">
    {userData.role === "user" && <UserDasboard />}
    {userData.role === "owner" && <OwnerDasboard />}
    {userData.role === "deliveryBoy" && <DeliveryBoyDasboard />}
  </div>
  );
}

export default Home;
