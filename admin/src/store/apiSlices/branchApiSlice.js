import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const branchApiSlice = createApi({
  reducerPath: 'branchApi',
  tagTypes: 'branches',
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
    getAllBranches: builder.query({
      query: (query) => (query ? `/branches?${query}` : '/branches'),
      providesTags: ['branches'],
    }),
    getBranch: builder.query({
      query: (id) => `/branches/${id}`,
      providesTags: ['branches'],
    }),
    createBranch: builder.mutation({
      query: (body) => ({
        url: '/branches',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['branches'],
    }),
    updateBranch: builder.mutation({
      query: ({ id, body }) => ({
        url: `/branches/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['branches'],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branches/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['branches'],
    }),
  }),
});

export const {
  useGetAllBranchesQuery,
  useGetBranchQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApiSlice;
export default branchApiSlice;
