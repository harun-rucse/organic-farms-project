import { configureStore } from '@reduxjs/toolkit';
import authApiSlice from './apiSlices/authApiSlice';
import employeeApiSlice from './apiSlices/employeeApiSlice';
import branchApiSlice from './apiSlices/branchApiSlice';
import categoryApiSlice from './apiSlices/categoryApiSlice';
import subCategoryApiSlice from './apiSlices/subCategoryApiSlice';
import farmerApiSlice from './apiSlices/farmerApiSlice';
import farmerCardApiSlice from './apiSlices/farmerCardApiSlice';
import productApiSlice from './apiSlices/productApiSlice';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    [branchApiSlice.reducerPath]: branchApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [subCategoryApiSlice.reducerPath]: subCategoryApiSlice.reducer,
    [farmerApiSlice.reducerPath]: farmerApiSlice.reducer,
    [farmerCardApiSlice.reducerPath]: farmerCardApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApiSlice.middleware,
      employeeApiSlice.middleware,
      branchApiSlice.middleware,
      categoryApiSlice.middleware,
      subCategoryApiSlice.middleware,
      farmerApiSlice.middleware,
      farmerCardApiSlice.middleware,
      productApiSlice.middleware,
    ]),
});

export default store;
