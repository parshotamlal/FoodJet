import express from "express"
import { signOut, signIn, signUp, setOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/auth.controller.js"


const authRouter =express.Router()



authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)  
authRouter.get("signout",signOut)
authRouter.post("/send-otp",setOtp)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)
authRouter.post("/google-auth",googleAuth)


export default authRouter