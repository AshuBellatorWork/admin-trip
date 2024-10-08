import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const createdCourseTitle = createApi({
  reducerPath: "createdCoursesTitle",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    createdCourseTitle: builder.mutation({
      query: (body) => ({
        url: "/course/create-course-title",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreatedCourseTitleMutation } = createdCourseTitle;
