import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subCategoryApiSlice = createApi({
  reducerPath: "subCategoryApi",
  tagTypes: "sub-categories",
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
    getAllSubCategories: builder.query({
      query: () => "/sub-categories",
      providesTags: ["sub-categories"]
    })
  })
});

export const { useGetAllSubCategoriesQuery } = subCategoryApiSlice;
export default subCategoryApiSlice;
