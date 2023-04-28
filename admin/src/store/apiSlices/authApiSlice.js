import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login-organization',
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
    getProfile: builder.query({
      query: () => '/auth/profile',
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation, useGetProfileQuery } = authApiSlice;
export default authApiSlice;
