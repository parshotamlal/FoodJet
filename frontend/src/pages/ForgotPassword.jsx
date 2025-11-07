import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../Url/ServerUrl";
import { toast } from "react-toastify";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);



  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result)
      setStep(2)
    
        toast.success("OTP sent to your email ");
    
    } catch (error) {
      console.log("Send OTP Error:", error.response?.data || error.message);
    }
  };
  const handleVerifyOtp = async () => {

     if (!otp || otp.trim() === "") {
    return toast.error("Please enter OTP");
  }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      toast.success("OTP verified successfully ");
      // setOtp(result.data.otp);
      setStep(3);
    } catch (error) {
      console.log("Verify OTP Error:", error.response?.data || error.message);
    }
  };


  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin")
       toast.success("Password reset successful ");
    } catch (error) {
      console.log("Send OTP Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className=" flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]"
    >
      <div className=" bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
        <div className=" flex w-full items-center justify-center gap-4 mb-4">
          <FaArrowLeftLong
            size={30}
            className=" text-[#ff4d2d]  "
            onClick={() => navigate("/signin")}
          />

          <h1 className=" text-2xl font-medium text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="w-full border rounded-lg px-3 py-2 border-[#ddd] focus:outline-none focus:border-orange-500"
                placeholder="Enter your Email"
              />
            </div>
            <button
              className="w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg hover:bg-amber-800"
              onClick={handleSendOtp}
            >
              Send Otp
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                className="w-full border rounded-lg px-3 py-2 border-[#ddd] focus:outline-none focus:border-orange-500"
                placeholder="Enter your Otp"
              />
            </div>
            <button
              className="w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg hover:bg-amber-800"
              onClick={handleVerifyOtp}
            >
              Verify Otp
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                className="w-full border rounded-lg px-3 py-2 border-[#ddd] focus:outline-none focus:border-orange-500"
                placeholder="Enter your New Password"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                className="w-full border rounded-lg px-3 py-2 border-[#ddd] focus:outline-none focus:border-orange-500"
                placeholder="Confirm Password"
              />
            </div>
            <button
              className="w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg hover:bg-amber-800"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
