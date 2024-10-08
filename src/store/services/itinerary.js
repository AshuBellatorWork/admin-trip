import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getItinerary = createApi({
    reducerPath: "itinerary",
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getItinerary: builder.query({
            query: (id) => ({
                url: `/itenarery/get/${id}`,
                method: "GET"
            }),
            providesTags:["itinerary"]
        }),
        addItinerary: builder.mutation({
            query: (body) => ({
                url: `/itenarery/addItenarary`,
                method: "POST",
                body
            }),
            invalidatesTags:["itinerary"]
        }),
        updateItinerary: builder.mutation({
            query: (body) => ({
                url: `/itenarery/updateItinerary/${body.id}`,
                method: "PUT",
                body:body?.data
            }),
            invalidatesTags:["itinerary"]
        }),
        deleteItinerary: builder.mutation({
            query: (id) => ({
                url: `/itenarery/deleteItinerary/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:["itinerary"]
        })
        
    })
})
export const {useGetItineraryQuery,useAddItineraryMutation,useUpdateItineraryMutation,useDeleteItineraryMutation} = getItinerary;