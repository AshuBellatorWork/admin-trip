import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const signUp = createApi({
  reducerPath: "signUp",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signUp;
