import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const packaged = createApi({
  reducerPath: "package",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: "/api/package",
        method: "GET",
      }),
    }),
    addPackage: builder.mutation({
      query: (body) => ({
        url: "api/package/addPackage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["package"],
    }),

    deletePackage: builder.mutation({
      query: (body) => ({
        url: `/api/package/deletePackage/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),
  }),
});

export const { useGetPackagesQuery , useAddPackageMutation, useDeletePackageMutation } = packaged;
