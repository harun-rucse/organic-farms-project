import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApiSlice = createApi({
  reducerPath: 'reviewApi',
  tagTypes: 'reviews',
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
    getAllReviews: builder.query({
      query: (query) => (query ? `/reviews?${query}` : '/reviews'),
      providesTags: ['reviews'],
    }),
    getReview: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ['reviews'],
    }),
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['reviews'],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;
export default reviewApiSlice;
