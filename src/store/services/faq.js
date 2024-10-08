import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getFaqServices = createApi({
  reducerPath: "getFaqServices",
  baseQuery: dynamicBaseQuery,
  tagTypes:["faq"],
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "/faq/get-faq",
        method: "GET",
      }),
      providesTags:["faq"]
    }),
    addFaq: builder.mutation({
        query: (body) => ({
          url: "/faq/add-faq",
          method: "POST",
          body
        }),
        invalidatesTags:["faq"]
      }),
      editFaq: builder.mutation({
        query: (body) => ({
          url: "/faq/edit-faq",
          method: "PUT",
          body
        }),
        invalidatesTags:["faq"]
      }),
      deleteFaq: builder.mutation({
        query: (body) => ({
          url: "/faq/delete-faq",
          method: "DELETE",
          body
        }),
        invalidatesTags:["faq"]
      }),
  }),
});

export const { useGetFaqQuery ,useAddFaqMutation,useEditFaqMutation,useDeleteFaqMutation} = getFaqServices;
