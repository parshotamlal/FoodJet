import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "owner",   // ✅ Change name
  initialState: {
    shopData: null,
  },
  reducers: {
    setShopData: (state, action) => {
      state.shopData = action.payload;
    },
  },
});

export const { setShopData } = shopSlice.actions;

// ✅ Export reducer with correct name
export const shopReducer = shopSlice.reducer;
