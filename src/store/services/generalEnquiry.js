import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const generalEnquired = createApi({
  reducerPath: "generalEnquiry",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    getgeneralEnquiry: builder.query({
      query: () => ({
        url: "/api/general-inquiry",
        method: "GET",
      }),
    }),

    updateStatus: builder.mutation({
      query: (body) => (
        console.log(body),
        {
          url: `/api/general-inquiry/updateGeneralEnquiryStatus/${body.id}`,
          method: "PUT",
          body: { status: body.value },
        }
      ),
      invalidatesTags: ["generalEnquiryList"],
    }),
  }),
});

export const { useGetgeneralEnquiryQuery, useUpdateStatusMutation } = generalEnquired;
