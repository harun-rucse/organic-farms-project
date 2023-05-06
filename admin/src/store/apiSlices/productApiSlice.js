import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApiSlice = createApi({
  reducerPath: 'productApi',
  tagTypes: 'products',
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
    getAllProducts: builder.query({
      query: () => '/products',
      providesTags: ['products'],
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['products'],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
export default productApiSlice;
