import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "./apiSlices/authApiSlice";
import subCategoryApiSlice from "./apiSlices/subCategoryApiSlice";
import productApiSlice from "./apiSlices/productApiSlice";
import branchApiSlice from "./apiSlices/branchApiSlice";
import orderApiSlice from "./apiSlices/orderApiSlice";
import reviewApiSlice from "./apiSlices/reviewApiSlice";
import paymentApiSlice from "./apiSlices/paymentApiSlice";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [subCategoryApiSlice.reducerPath]: subCategoryApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [branchApiSlice.reducerPath]: branchApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
    [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApiSlice.middleware,
      subCategoryApiSlice.middleware,
      productApiSlice.middleware,
      branchApiSlice.middleware,
      orderApiSlice.middleware,
      reviewApiSlice.middleware,
      paymentApiSlice.middleware
    ])
});

export default store;
