import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const transactionApiSlice = createApi({
  reducerPath: 'transactionApi',
  tagTypes: 'transactions',
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
    getAllTransactions: builder.query({
      query: () => '/transactions',
      providesTags: ['transactions'],
    }),
    getTransaction: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: ['transactions'],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, body }) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['transactions'],
    }),
  }),
});

export const { useGetAllTransactionsQuery, useGetTransactionQuery, useUpdateTransactionMutation } = transactionApiSlice;
export default transactionApiSlice;
