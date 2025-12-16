import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null,
    location: Cookies.get("location")
      ? JSON.parse(Cookies.get("location"))
      : null,
    // userInfo: null,
  },

  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      Cookies.set("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
    logout: (state) => {
      Cookies.remove("userInfo");
      state.userInfo = null;
    },
    setLocation: (state, action) => {
      console.log(action.payload);
      Cookies.set("location", JSON.stringify(action.payload));
      state.location = action.payload;
    },
    removeLocation: (state) => {
      Cookies.remove("location");
      state.location = null;
    },

  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setLocation,
  removeLocation } = userSlice.actions;

export default userSlice.reducer;
