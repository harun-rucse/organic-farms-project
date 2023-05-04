import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customerApiSlice = createApi({
  reducerPath: 'customerApi',
  tagTypes: 'customers',
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
    getAllCustomers: builder.query({
      query: () => '/customers',
      providesTags: ['customers'],
    }),
    getCustomer: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ['customers'],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/customers/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['customers'],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customers'],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApiSlice;
export default customerApiSlice;
