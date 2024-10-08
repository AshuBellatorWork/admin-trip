// 


import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const packageDetail = createApi({
  reducerPath: "packageDetail",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getPackageDetail: builder.query({
      query: (body) => ({
        url: `/package/PackageGetById/${body}`,
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
        url: `/package/updatePackages/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),

    // deletePackage: builder.mutation({
    //   query: (body) => ({
    //     url: `/package/PackageDeleteById/${body.id}`,
    //     method: "DELETE",
    //     }), 
    //   invalidatesTags:["category"]
    // }),
  }),
});

export const {useUpdatePackagesDetailMutation, useAddPackageDetailMutation,useEditPackageDetailsMutation, useGetPackageMutation ,useGetPackageDetailQuery} = packageDetail;
