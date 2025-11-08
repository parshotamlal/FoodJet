import { useState } from "react";
import logo from "../assets/foodjet.png";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../Url/ServerUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import  {auth}  from "../../Firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleSignIn = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(response.data))

      console.log("✅ Signup Success:", response.data);
      toast.success("Account Login successfully!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        alert("Server error. Please check backend.");
      }
      console.log("Signup Error:", error);
    }
  };


  
  const handleGoogleAuth = async () => {
  
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
          
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data))


  
      console.log("Server Response:", data);
      toast.success("Login successfully")
  
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg border border-[#ddd] w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="FoodJet Logo" className="w-24 h-auto mb-6" />
          <p className="text-gray-500 text-center">
            Log in your account to get started with delicious food deliveries
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
            placeholder="Enter your Email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg px-3 py-2 pr-10 border-[#ddd] focus:outline-none focus:border-orange-500"
              placeholder="Enter your 8 character password"
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        

        <div className="mb-4 text-right">
          <button
            onClick={() => navigate("/forget-password")}
            type="button"
            className="text-amber-600 font-medium hover:underline"
          >
            Forget Password?
          </button>
        </div>


        {/* Submit Button */}
        <button
          onClick={handleSignIn}
          className="w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg hover:bg-amber-800"
        >
          Sign In
        </button>

        {/* Google Button */}
        <button className="relative w-full mt-5 px-4 py-2 rounded-lg flex justify-center items-center border hover:bg-amber-50" onClick={handleGoogleAuth}>
          <FcGoogle className="absolute left-4 h-6 w-6" />
          <h1 className="font-bold">Continue with Google</h1>
        </button>

        <p className="font-bold w-full mt-5 text-[#281512] flex justify-center">
          Create new account
          <Link className="font-bold ml-2 text-[#ff4d2d]" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
