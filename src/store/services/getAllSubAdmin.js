import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllSubAdmin = createApi({
  reducerPath: "getAllSubAdmin",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["getAllSubAdmin"],
  endpoints: (builder) => ({
    getAllSubAdmin: builder.query({
      query: (body) => ({
        url: "/user/admin-lists",
        method: "GET",
        body,
      }),
      providesTags: ["getAllSubAdmin"],
    }),
    // getUserData: builder.query({
    //   query: (body) => ({
    //     url: "/user/user-data",
    //     method: "GET",
    //     body,
    //   }),
    //   providesTags: ["getAllSubAdmin"],
    // }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/user/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getAllSubAdmin"],
    }),
    deleteAdmin: builder.mutation({
      query: (body) => ({
        url: "/user/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["getAllSubAdmin"],
    }),
    editAdmin: builder.mutation({
      query: (body) => ({
        url: "/user/edit",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["getAllSubAdmin"],
    }),
  }),
});

export const {
  useGetAllSubAdminQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useEditAdminMutation,
  useGetUserDataQuery,
} = getAllSubAdmin;
