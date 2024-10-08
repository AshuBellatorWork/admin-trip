import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getCategory = createApi({
  reducerPath: "category2",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/category/getCategory",
        method: "GET",
      }),
      providesTags:["category"]
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "/category/addCategory",
        method: "POST",
        body,
      }),
      invalidatesTags:["category"]
    }),
    editCategory: builder.mutation({
      query: (body) => ({
        url: `/category/updateCategory/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    deleteCategory: builder.mutation({
      query: (body) => ({
        url: `/category/deleteCategory/${body.id}`,
        method: "DELETE",
        }), 
      invalidatesTags:["category"]
    }),
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation } = getCategory;
