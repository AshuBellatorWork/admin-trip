import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const inquiry = createApi({
  reducerPath: "inquiry",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    getInquiry: builder.query({
      query: () => ({
        url: "/api/inquiry",
        method: "GET",
      }),
    }),

    updateStatus: builder.mutation({
      query: (body) => (
        console.log(body),
        {
          url: `/api/inquiry/updateEnquiryStatus/${body.id}`,
          method: "PUT",
          body: { status: body.value },
        }
      ),
      invalidatesTags: ["enquiryList"],
    }),
  }),
});
export const { useGetInquiryQuery, useUpdateStatusMutation } = inquiry;

