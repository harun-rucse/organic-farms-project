import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  tagTypes: 'categories',
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
    getAllCategories: builder.query({
      query: (query) => (query ? `/categories?${query}` : '/categories'),
      providesTags: ['categories'],
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ['categories'],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
export default categoryApiSlice;
