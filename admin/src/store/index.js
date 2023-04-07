import { configureStore } from '@reduxjs/toolkit';
import authApiSlice from './apiSlices/authApiSlice';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApiSlice.middleware]),
});

export default store;
