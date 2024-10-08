import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getTourPackages = createApi({
  reducerPath: "category",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getTourCategory: builder.query({
      query: (body) => ({
        url: "/package/getAllPackages", 
        method: "GET",
        body,
      }),
      providesTags:["category"]
    }),
    addTourPackages: builder.mutation({
      query: (body) => ({
        url: `/tour/addToursByCategory/${body.id}`,
        method: "POST",
        body:body.data,
      }),
      invalidatesTags:["category"]
    }),
    editTourPackages: builder.mutation({
      query: (body) => ({
        url: `/tour/updateTourByTourId/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    deleteTourPackage: builder.mutation({
      query: (body) => ({
        url: `/tour/deletetoursBytourId/${body.id}`,
        method: "DELETE",
        }), 
      invalidatesTags:["category"]
    }),
    deletePackage: builder.mutation({
      query: (body) => ({
        url: `/package/PackageDeleteById/${body.id}`,
        method: "DELETE",
        }), 
      invalidatesTags:["category"]
    }),
  }),
});

export const {useDeletePackageMutation, useGetTourCategoryQuery, useAddTourPackagesMutation, useEditTourPackagesMutation, useDeleteTourPackageMutation } = getTourPackages;
