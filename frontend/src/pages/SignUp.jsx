// import { useState } from "react";
// import logo from "../assets/foodjet.png";
// import { FaRegEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // import { serverUrl } from "../Url/ServerUrl";



// function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState("user");
//   const [fullName,setFullName]=useState("")
//   const [email,setEmail]=useState("")
//   const [mobile,setMobile]=useState("")
//   const [password,setPassword]=useState("")

//   const handleSignUp = async()=> {
//     try{
//       const result = await axios.post(`/api/auth/signup`, {
//   fullName, email, password, mobile, role
// }, { withCredentials: true });
//       console.log(result)


//     } catch(error){
//       console.log(error)

//   }
// }

//   return (
//     <div className=" flex items-center justify-center min-h-screen w-full p-4  bg-[#fff9f6] ">
//       <div className=" bg-white rounded-xl shadow-lg border-[1px] border-[#ddd] w-full max-w-md p-8">
//         <div className="flex flex-col items-center mb-6">
//           <img src={logo} alt="FoodJet Logo" className="w-24 h-auto mb-6" />

//           {/* Removed FoodJet text line */}

//           <p className="text-gray-500 text-center">
//             Create your account to get started with delicious food deliveries
//           </p>
//         </div>

//         {/* fullName */}

//         <div className=" mb-4">
//           <label
//             htmlFor="fullName"
//             className=" block text-gray-700 font-medium mb-1"
//           >
//             Full Name
//           </label>
//           <input onChange={(e) =>setFullName(e.target.value)} value={fullName}
//             type="text"
//             className=" w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
//             placeholder=" Enter your Full Name"
//           />
//         </div>

//         {/* email */}
//         <div className=" mb-4">
//           <label
//             htmlFor="email"
//             className=" block text-gray-700 font-medium mb-1"
//           >
//             Email
//           </label>
//           <input  onChange={(e) =>setEmail(e.target.value)} value={email}
//             type="text"
//             className=" w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
//             placeholder=" Enter your Email"
//           />
//         </div>

//         {/* mobile */}
//          <div className=" mb-4">
//           <label
//             htmlFor="mobile"
//             className=" block text-gray-700 font-medium mb-1"
//           >
//             Mobile
//           </label>
//           <input  onChange={(e) =>setMobile(e.target.value)} value={mobile}
//             type="text"
//             className=" w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
//             placeholder=" Enter your Mobile Number"
//           />
//         </div>

        

//         {/* password */}


//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Password
//           </label>

//           <div className="relative">
//             <input onChange={(e) =>setPassword(e.target.value)} value={password}
//               type={showPassword ? "text" : "password"}
//               className="w-full border rounded-lg px-3 py-2 pr-10 border-[#ddd] focus:outline-none focus:border-orange-500"
//               placeholder="Enter your 8 character password"
//             />

//             <button
//               onClick={() => setShowPassword((prev) => !prev)}
//               type="button"
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//             >
//               {!showPassword ? <FaEyeSlash /> : <FaRegEye />}
//             </button>
//           </div>
//         </div>

//         {/* Role */}
//         <div className="relative flex gap-2">
//           {["user", "owner", "deliveryBoy"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setRole(r)}
//               className={`
//         flex-1 px-3 py-2 rounded-lg text-center font-medium border transition-colors
//         ${
//           role === r
//             ? "bg-[#ff4d2d] border-[#ff4d2d] text-white hover:bg-amber-600"
//             : "border-[#ddd] text-[#333]"
//         }
//       `}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         <button onClick={handleSignUp} className=" w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg flex justify-center items-center hover:bg-amber-800">
//           Sign Up
//         </button>

//         <button className="relative w-full mt-5 px-4 py-2 rounded-lg flex justify-center items-center border hover:bg-amber-50">
//           <FcGoogle className="absolute left-4 h-6 w-6" />
//           <h1 className="font-bold">Continue with Google</h1>
//         </button>

//         <p className=" font-bold w-full mt-5 px-4 py-2 text-[#281512]  flex justify-center items-center ">
//           Already have an account{" "}
//           <Link className=" font-bold ml-2 text-[#ff4d2d] " to="/signin">
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SignUp;



import { useState } from "react";
import logo from "../assets/foodjet.png";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../Url/ServerUrl";

import axios from "axios";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!fullName || !email || !mobile || !password) {
      return alert("Please fill all fields");
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );

      console.log("✅ Signup Success:", response.data);
      alert("Account created successfully!");
      navigate("/signin");

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Signup failed");
      } else {
        alert("Server error. Please check backend.");
      }
      console.log("❌ Signup Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg border border-[#ddd] w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="FoodJet Logo" className="w-24 h-auto mb-6" />
          <p className="text-gray-500 text-center">
            Create your account to get started with delicious food deliveries
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
            placeholder="Enter your Full Name"
          />
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

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Mobile</label>
          <input
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 border-[#ddd]"
            placeholder="Enter your Mobile Number"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
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

        {/* Role Selection */}
        <div className="flex gap-2 mt-3 mb-2">
          {["user", "owner", "deliveryBoy"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 px-3 py-2 rounded-lg text-center font-medium border transition-colors ${
                role === r
                  ? "bg-[#ff4d2d] border-[#ff4d2d] text-white"
                  : "border-[#ddd] text-[#333]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          className="w-full mt-5 px-4 py-2 text-white bg-[#ff4d2d] rounded-lg hover:bg-amber-800"
        >
          Sign Up
        </button>

        {/* Google Button */}
        <button className="relative w-full mt-5 px-4 py-2 rounded-lg flex justify-center items-center border hover:bg-amber-50">
          <FcGoogle className="absolute left-4 h-6 w-6" />
          <h1 className="font-bold">Continue with Google</h1>
        </button>

        <p className="font-bold w-full mt-5 text-[#281512] flex justify-center">
          Already have an account?
          <Link className="font-bold ml-2 text-[#ff4d2d]" to="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
