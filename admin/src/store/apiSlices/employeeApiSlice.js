import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const employeeApiSlice = createApi({
  reducerPath: 'employeeApi',
  tagTypes: 'employees',
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
    getAllEmployees: builder.query({
      query: (query) => (query ? `/employees?${query}` : '/employees'),
      providesTags: ['employees'],
    }),
    getEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: ['employees'],
    }),
    createEmployee: builder.mutation({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['employees'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['employees'],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employees'],
    }),
    getAllDeliveryPersons: builder.query({
      query: (query) => (query ? `/employees/delivery-persons?${query}` : '/employees/delivery-persons'),
      providesTags: ['employees'],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllDeliveryPersonsQuery,
} = employeeApiSlice;
export default employeeApiSlice;
