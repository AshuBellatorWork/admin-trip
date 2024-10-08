import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getDeletedRequest = createApi({
  reducerPath: "DeletedRequest",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getDeletedRequest: builder.query({
      query: () => ({
        url: `/course/course-delete-request`,
        method: "GET",
      }),
    }),
    deletedRequest: builder.mutation({
      query: (body) => ({
        url: `/course/cancel-course-delete-request`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetDeletedRequestQuery, useDeletedRequestMutation } =
  getDeletedRequest;
