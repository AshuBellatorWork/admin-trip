import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const clientQuery = createApi({
  reducerPath: "clientQuery",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["clientQuery"],
  endpoints: (builder) => ({
    getClientQuery: builder.query({
      query: () => ({
        url: "/query/get",
        method: "GET",
      }),
      providesTags: ["clientQuery"],
    }),
    deleteClientQuery: builder.mutation({
      query: (body) => ({
        url: "/query/delete",
        method: "DELETE",
        body
      }),
      invalidatesTags: ["clientQuery"],
    }),
  }),
});

export const { useGetClientQueryQuery, useDeleteClientQueryMutation } = clientQuery;
