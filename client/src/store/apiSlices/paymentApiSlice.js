import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApiSlice = createApi({
  reducerPath: "paymentApi",
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
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/payment/checkout",
        method: "POST",
        body
      })
    })
  })
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMySingleOrderQuery
} = paymentApiSlice;
export default paymentApiSlice;
