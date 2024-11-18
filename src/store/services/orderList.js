import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getOrders = createApi({
  reducerPath: "order",
  baseQuery: dynamicBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "/api/order",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: "/api/order/add-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});
export const { useGetOrderQuery, useAddOrderMutation } = getOrders;
