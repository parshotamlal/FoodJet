

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: null,
    currentState:null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setcurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setcurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const { setUserData, setcurrentCity,setcurrentState } = userSlice.actions;

// ✅ Named export matches your store.js import
export const userReducer = userSlice.reducer;


// const userSlice= createSlice({
//     name:"user",
//     initialState:{
//         userData:null,
//     },
//     reducers:{
//         setuserdata:(state,action)=>{
//             state.userData=action.payload

//         }
//     }
// })


// export const {setuserdata}=userSlice.actions

// export default userSlice.reducer
