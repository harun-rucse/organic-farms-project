import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const salaryApiSlice = createApi({
  reducerPath: 'salaryApi',
  tagTypes: 'salaries',
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
    getAllSalaries: builder.query({
      query: (query) => (query ? `/salaries?${query}` : '/salaries'),
      providesTags: ['salaries'],
    }),
    getSalary: builder.query({
      query: (id) => `/salaries/${id}`,
      providesTags: ['salaries'],
    }),
    createSalary: builder.mutation({
      query: (body) => ({
        url: '/salaries',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['salaries'],
    }),
    updateSalary: builder.mutation({
      query: ({ id, body }) => ({
        url: `/salaries/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['salaries'],
    }),
    deleteSalary: builder.mutation({
      query: (id) => ({
        url: `/salaries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['salaries'],
    }),
  }),
});

export const {
  useGetAllSalariesQuery,
  useGetSalaryQuery,
  useCreateSalaryMutation,
  useUpdateSalaryMutation,
  useDeleteSalaryMutation,
} = salaryApiSlice;
export default salaryApiSlice;
