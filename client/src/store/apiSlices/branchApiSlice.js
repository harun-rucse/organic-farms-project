import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const branchApiSlice = createApi({
  reducerPath: "branchApi",
  tagTypes: "branches",
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
    getAllBranches: builder.query({
      query: (query) => (query ? `/branches?${query}` : "/branches"),
      providesTags: ["branches"]
    }),
    getBranch: builder.query({
      query: (id) => `/branches/${id}`,
      providesTags: ["branches"]
    })
  })
});

export const { useGetAllBranchesQuery, useGetBranchQuery } = branchApiSlice;
export default branchApiSlice;
