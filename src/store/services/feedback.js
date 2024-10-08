import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getFeedback = createApi({
    reducerPath: "feedback",
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getFeedback: builder.query({
            query: () => ({
                url: "/feedback/getFeedback",
                method: "GET"
            })
        })
    })
})
export const {useGetFeedbackQuery} = getFeedback;