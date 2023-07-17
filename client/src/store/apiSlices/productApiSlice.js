import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApiSlice = createApi({
  reducerPath: "productApi",
  tagTypes: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) =>
        query ? `/products/frontend?${query}` : "/products/frontend",
      providesTags: ["products"]
    }),
    getProduct: builder.query({
      query: (id) => `/products/frontend/${id}`,
      providesTags: ["products"]
    })
  })
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApiSlice;
export default productApiSlice;
