import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const payFees = createApi({
  reducerPath: "payFees",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    payFees: builder.mutation({
      query: (body) => ({
        url: "/transaction/pay-fee",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePayFeesMutation } = payFees;
