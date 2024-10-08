import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const editCourse = createApi({
  reducerPath: "editCourse",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    editCourse: builder.mutation({
      query: (body) => ({
        url: "/course/edit-course",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useEditCourseMutation } = editCourse;
