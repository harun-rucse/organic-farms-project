import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApiSlice = createApi({
  reducerPath: "reviewApi",
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
    createReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body
      })
    })
  })
});

export const { useCreateReviewMutation } = reviewApiSlice;
export default reviewApiSlice;
