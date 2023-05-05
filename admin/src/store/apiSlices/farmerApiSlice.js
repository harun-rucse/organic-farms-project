import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const farmerApiSlice = createApi({
  reducerPath: 'farmerApi',
  tagTypes: 'farmers',
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
    getAllFarmers: builder.query({
      query: (query) => (query ? `/farmers?${query}` : '/farmers'),
      providesTags: ['farmers'],
    }),
    getFarmer: builder.query({
      query: (id) => `/farmers/${id}`,
      providesTags: ['farmers'],
    }),
    createFarmer: builder.mutation({
      query: (body) => ({
        url: '/farmers',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['farmers'],
    }),
    updateFarmer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/farmers/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['farmers'],
    }),
    deleteFarmer: builder.mutation({
      query: (id) => ({
        url: `/farmers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['farmers'],
    }),
  }),
});

export const {
  useGetAllFarmersQuery,
  useGetFarmerQuery,
  useCreateFarmerMutation,
  useUpdateFarmerMutation,
  useDeleteFarmerMutation,
} = farmerApiSlice;
export default farmerApiSlice;
