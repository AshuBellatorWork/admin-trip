import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getCategory = createApi({
  reducerPath: "category2",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
      }),
      providesTags:["category"]
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "api/category/addCategory",
        method: "POST",
        body,
      }),
      invalidatesTags:["category"]
    }),
    editCategory: builder.mutation({
      query: (body) => ({
        url: `api/category/updateCategory/${body.id}`,
        method: "PUT",
        body:body.data
      }),
      invalidatesTags:["category"]
    }),
    deleteCategory: builder.mutation({
      query: (body) => ({
        url: `/api/category/deleteCategory/${body.id}`,
        method: "DELETE",
        }), 
      invalidatesTags:["category"]
    }),

    getCat: builder.query({
      query: () => ({
        url: '/api/category',  
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoryQuery, useAddCategoryMutation, useEditCategoryMutation, useDeleteCategoryMutation, useGetCatQuery } = getCategory;
