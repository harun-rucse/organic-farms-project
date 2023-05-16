import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const statsApiSlice = createApi({
  reducerPath: 'statsApi',
  tagTypes: 'statistics',
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
    getAllStatsCount: builder.query({
      query: (query) => (query ? `/statistics/count?${query}` : '/statistics/count'),
      providesTags: ['statistics'],
    }),
    getAllStatsAmount: builder.query({
      query: (query) => (query ? `/statistics/amount?${query}` : '/statistics/amount'),
      providesTags: ['statistics'],
    }),
  }),
});

export const { useGetAllStatsCountQuery, useGetAllStatsAmountQuery } = statsApiSlice;
export default statsApiSlice;
