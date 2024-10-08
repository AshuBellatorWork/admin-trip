import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const enquiryList = createApi({
  reducerPath: "enquiryList",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    enquiryList: builder.query({
      query: (body) => ({
        url: `/enquiry/getAllEnquiries/?status=`,
        method: "GET",
      }),
      providesTags:["enquiryList"]
      }),
      updateStatus: builder.mutation({
        query: (body) => (console.log(body),{

          url: `/enquiry/updateEnquiryStatus/${body.id}`,
          method: "PUT",
          body:{status:body.value}
          }),
        invalidatesTags:["enquiryList"]
    }),
  }),
});

export const { useEnquiryListQuery,useUpdateStatusMutation } = enquiryList;
