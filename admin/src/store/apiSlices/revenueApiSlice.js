import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const revenueApiSlice = createApi({
  reducerPath: 'revenueApi',
  tagTypes: 'revenues',
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
    getAllRevenues: builder.query({
      query: () => '/revenues',
      providesTags: ['revenues'],
    }),
  }),
});

export const { useGetAllRevenuesQuery } = revenueApiSlice;
export default revenueApiSlice;
