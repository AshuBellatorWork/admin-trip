import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const pendingFees = createApi({
  reducerPath: "pendingFees",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    pendingFees: builder.query({
      query: () => ({
        url: "/student/pending-fees",
        method: "GET",
      }),
    }),
  }),
});

export const { usePendingFeesQuery } = pendingFees;
