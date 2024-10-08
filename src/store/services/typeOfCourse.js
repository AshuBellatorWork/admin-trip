import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const typeOfCourse = createApi({
  reducerPath: "typeOfCourse",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["typeOfCourse"],
  endpoints: (builder) => ({
    createTypeOfCourse: builder.mutation({
      query: (body) => ({
        url: "/category-type/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["typeOfCourse"],
    }),
    getTypeOfCourse: builder.query({
      query: () => ({
        url: "/category-type/get",
        method: "GET",
      }),
      providesTags: ["typeOfCourse"],
    }),
    editTypeOfCourse: builder.mutation({
      query: (body) => ({
        url: "/category-type/edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["typeOfCourse"],
    }),
    deleteTypeOfCourse: builder.mutation({
      query: (body) => ({
        url: "/category-type/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["typeOfCourse"],
    }),
  }),
});

export const {
  useGetTypeOfCourseQuery,
  useCreateTypeOfCourseMutation,
  useEditTypeOfCourseMutation,
  useDeleteTypeOfCourseMutation,
} = typeOfCourse;
