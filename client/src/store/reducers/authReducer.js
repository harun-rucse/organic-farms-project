import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("jwt-token") || null
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("jwt-token", action.payload);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem("jwt-token");
    }
  }
});

export const { setToken, removeToken } = authReducer.actions;
export default authReducer.reducer;
