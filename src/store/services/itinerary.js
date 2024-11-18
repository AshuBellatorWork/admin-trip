import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getItinerary = createApi({
    reducerPath: "itinerary",
    baseQuery: dynamicBaseQuery,
    //  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
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
        }),

        getItenary: builder.query({
            query: (id) => ({
                url: `/api/itenary`,
                method: "GET"
            }),
            providesTags:["itinerary"]
        }),
        
    })
})
export const {useGetItineraryQuery,useAddItineraryMutation,useUpdateItineraryMutation,useDeleteItineraryMutation, useGetItenaryQuery} = getItinerary;