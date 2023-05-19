import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApiSlice = createApi({
  reducerPath: 'orderApi',
  tagTypes: 'orders',
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
    getAllOrders: builder.query({
      query: () => '/orders',
      providesTags: ['orders'],
    }),
    getLatestOrders: builder.query({
      query: () => '/orders/latest-orders',
      providesTags: ['orders'],
    }),
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['orders'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['orders'],
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetLatestOrdersQuery, useGetOrderQuery, useUpdateOrderMutation } =
  orderApiSlice;
export default orderApiSlice;
