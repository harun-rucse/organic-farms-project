import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const farmerCardApiSlice = createApi({
  reducerPath: 'farmerCardApi',
  tagTypes: 'farmer-cards',
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
    getAllFarmerCards: builder.query({
      query: (query) => (query ? `/farmer-cards?${query}` : '/farmer-cards'),
      providesTags: ['farmer-cards'],
    }),
    getFarmerCard: builder.query({
      query: (id) => `/farmer-cards/${id}`,
      providesTags: ['farmer-cards'],
    }),
    createFarmerCard: builder.mutation({
      query: (body) => ({
        url: '/farmer-cards',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['farmer-cards'],
    }),
    deleteFarmerCard: builder.mutation({
      query: (id) => ({
        url: `/farmer-cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['farmer-cards'],
    }),
  }),
});

export const {
  useGetAllFarmerCardsQuery,
  useGetFarmerCardQuery,
  useCreateFarmerCardMutation,
  useUpdateFarmerCardMutation,
  useDeleteFarmerCardMutation,
} = farmerCardApiSlice;
export default farmerCardApiSlice;
