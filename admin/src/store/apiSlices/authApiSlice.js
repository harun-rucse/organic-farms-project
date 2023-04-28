import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    sendOtp: builder.mutation({
      query: (body) => ({
        url: '/auth/send-otp',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation } = authApiSlice;
export default authApiSlice;
