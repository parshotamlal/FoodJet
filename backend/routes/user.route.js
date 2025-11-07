import express from "express"
import { signOut, signIn, signUp, setOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/auth.controller.js"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


const userRouter =express.Router()



userRouter.get("/current-user",isAuth,getCurrentUser)
export default userRouter