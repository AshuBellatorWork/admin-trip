import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const createNewStudent = createApi({
  reducerPath: "createNewStudent",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    createNewStudent: builder.mutation({
      query: (body) => ({
        url: "/student/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateNewStudentMutation } = createNewStudent;
