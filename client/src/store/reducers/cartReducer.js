import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity = Number(existingProduct?.quantity) + 1;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        existingProduct.quantity -= 1;

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    deleteCartItem(state, action) {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product._id
        );

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }
  }
});

export const { addToCart, removeCartItem, deleteCartItem, clearCart } =
  cartReducer.actions;
export default cartReducer.reducer;
