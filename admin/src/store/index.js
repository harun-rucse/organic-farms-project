import { configureStore } from '@reduxjs/toolkit';
import authApiSlice from './apiSlices/authApiSlice';
import employeeApiSlice from './apiSlices/employeeApiSlice';
import branchApiSlice from './apiSlices/branchApiSlice';
import categoryApiSlice from './apiSlices/categoryApiSlice';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [employeeApiSlice.reducerPath]: employeeApiSlice.reducer,
    [branchApiSlice.reducerPath]: branchApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApiSlice.middleware,
      employeeApiSlice.middleware,
      branchApiSlice.middleware,
      categoryApiSlice.middleware,
    ]),
});

export default store;
