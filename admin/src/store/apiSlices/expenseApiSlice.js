import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const expenseApiSlice = createApi({
  reducerPath: 'expenseApi',
  tagTypes: 'expenses',
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
    getAllExpenses: builder.query({
      query: () => '/expenses',
      providesTags: ['expenses'],
    }),
    getExpense: builder.query({
      query: (id) => `/expenses/${id}`,
      providesTags: ['expenses'],
    }),
    createExpense: builder.mutation({
      query: (body) => ({
        url: '/expenses',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['expenses'],
    }),
    updateExpense: builder.mutation({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['expenses'],
    }),
  }),
});

export const { useGetAllExpensesQuery, useGetExpenseQuery, useCreateExpenseMutation, useUpdateExpenseMutation } =
  expenseApiSlice;
export default expenseApiSlice;
