// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userData: null,
//     city:null,
//   },
//   reducers: {
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//     },
//      setCity: (state, action) => {
//       state.city = action.payload;
//     },
//   },
// });

// // ✅ Named exports (no default export)
// export const { setUserData,setCity } = userSlice.actions;
// export const userReducer = userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setUserData, setCity } = userSlice.actions;

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
