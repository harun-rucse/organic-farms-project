import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      })
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body
      })
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["auth"]
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body
      }),
      invalidatesTags: ["auth"]
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body
      })
    })
  })
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useRegisterMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation
} = authApiSlice;
export default authApiSlice;
