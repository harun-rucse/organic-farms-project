import { configureStore } from '@reduxjs/toolkit';
import authApiSlice from './apiSlices/authApiSlice';
import employeeApiSlice from './apiSlices/employeeApiSlice';
import branchApiSlice from './apiSlices/branchApiSlice';
import categoryApiSlice from './apiSlices/categoryApiSlice';
import subCategoryApiSlice from './apiSlices/subCategoryApiSlice';
import farmerApiSlice from './apiSlices/farmerApiSlice';
import farmerCardApiSlice from './apiSlices/farmerCardApiSlice';
import productApiSlice from './apiSlices/productApiSlice';
import reviewApiSlice from './apiSlices/reviewApiSlice';
import customerApiSlice from './apiSlices/customerApiSlice';
import expenseApiSlice from './apiSlices/expenseApiSlice';
import salaryApiSlice from './apiSlices/salaryApiSlice';
import orderApiSlice from './apiSlices/orderApiSlice';
import revenueApiSlice from './apiSlices/revenueApiSlice';
import transactionApiSlice from './apiSlices/transactionApiSlice';
import statsApiSlice from './apiSlices/statsApiSlice';
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
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
    [customerApiSlice.reducerPath]: customerApiSlice.reducer,
    [expenseApiSlice.reducerPath]: expenseApiSlice.reducer,
    [salaryApiSlice.reducerPath]: salaryApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [revenueApiSlice.reducerPath]: revenueApiSlice.reducer,
    [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
    [statsApiSlice.reducerPath]: statsApiSlice.reducer,
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
      reviewApiSlice.middleware,
      customerApiSlice.middleware,
      expenseApiSlice.middleware,
      salaryApiSlice.middleware,
      orderApiSlice.middleware,
      revenueApiSlice.middleware,
      transactionApiSlice.middleware,
      statsApiSlice.middleware,
    ]),
});

export default store;
