import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice.js";
import { shopReducer } from "./shopSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner:shopReducer
  },
});
