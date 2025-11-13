import { useSelector } from "react-redux";
import Navbar from "./Navbar";

function UserDasboard() {

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <Navbar />
      <div className="mt-10 text-2xl text-center font-semibold">
        Hello, User Dashboard is Working ✅
      </div>
    </div>
  );
}

export default UserDasboard;
