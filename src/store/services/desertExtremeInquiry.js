import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const desertExtremeInquiry = createApi({
  reducerPath: 'desertinquiry',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), 
  endpoints: (builder) => ({
    getDesertExtremeInquiry: builder.query({
      query: () => ({
        url: '/api/desertextremeinquiry',  
        method: 'GET',
      }),
    }),

  }),
});
export const { useGetDesertExtremeInquiryQuery } = desertExtremeInquiry;
