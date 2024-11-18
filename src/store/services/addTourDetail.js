// 


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const packageDetail = createApi({
  reducerPath: "packageDetail",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    getPackageDetail: builder.query({
      query: (body) => ({
        url: `api/package/PackageGetById/${body}`,
        method: "GET",
      }),
      providesTags:["category"]
    }),
    getPackage: builder.mutation({
      query: (body) => ({
        url: "/tourDetails/getTourDetails",
        method: "POST",
        body
      }),
      providesTags:["category"]
    }),
    addPackageDetail: builder.mutation({
      query: (body) => ({
        url: "/package/addPackage",
        method: "POST",
        body,
      }),
      invalidatesTags:["category"]
    }),
    editPackageDetails: builder.mutation({
      query: (body) => ({
        url: `/tourDetails/updateTourDetails/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    updatePackagesDetail: builder.mutation({
      query: (body) => ({
        url: `api/package/updatePackages/${body.id}`,
        method: "POST",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
  }),
});

export const {useUpdatePackagesDetailMutation, useAddPackageDetailMutation,useEditPackageDetailsMutation, useGetPackageMutation ,useGetPackageDetailQuery} = packageDetail;
