import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const subCategoryApiSlice = createApi({
  reducerPath: 'subCategoryApi',
  tagTypes: 'sub-categories',
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
    getAllSubCategories: builder.query({
      query: (query) => (query ? `/sub-categories?${query}` : '/sub-categories'),
      providesTags: ['sub-categories'],
    }),
    getSubCategory: builder.query({
      query: (id) => `/sub-categories/${id}`,
      providesTags: ['sub-categories'],
    }),
    createSubCategory: builder.mutation({
      query: (body) => ({
        url: '/sub-categories',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['sub-categories'],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/sub-categories/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['sub-categories'],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['sub-categories'],
    }),
  }),
});

export const {
  useGetAllSubCategoriesQuery,
  useGetSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApiSlice;
export default subCategoryApiSlice;
