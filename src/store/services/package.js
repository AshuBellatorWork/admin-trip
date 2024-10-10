import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const packaged = createApi({
  reducerPath: 'package',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }), 
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: '/api/package',  
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetPackagesQuery } = packaged;

