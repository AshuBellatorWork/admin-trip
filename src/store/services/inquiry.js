import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inquiry = createApi({
  reducerPath: 'inquiry',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), 
  endpoints: (builder) => ({
    getInquiry: builder.query({
      query: () => ({
        url: '/api/inquiry',  
        method: 'GET',
      }),
    }),

  }),
});
export const { useGetInquiryQuery } = inquiry;

