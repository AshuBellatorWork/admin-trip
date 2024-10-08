import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const courseDeletedResquest = createApi({
  reducerPath: "courseDeletedRequest",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    courseDeletedResquest: builder.mutation({
      query: (body) => ({
        url: "/course/course-delete-request",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCourseDeletedResquestMutation } = courseDeletedResquest;
