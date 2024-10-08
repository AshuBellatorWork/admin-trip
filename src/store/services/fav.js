// 



import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const favTour = createApi({
  reducerPath: "favTour",
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getFavTour: builder.query({
      query: (body) => ({
        url: "/FavTour/getAllFavoriteTours", 
        method: "GET",
        body,
      }),
      providesTags:["category"]
    }),
    // addTourPackages: builder.mutation({
    //   query: (body) => ({
    //     url: `/tour/addToursByCategory/${body.id}`,
    //     method: "POST",
    //     body:body.data,
    //   }),
    //   invalidatesTags:["category"]
    // }),
    // editTourPackages: builder.mutation({
    //   query: (body) => ({
    //     url: `/tour/updateTourByTourId/${body.id}`,
    //     method: "PUT",
    //     body:body.data
    //   }),
    //   invalidatesTags:["category"]
    // }),
    deleteFavTour: builder.mutation({
      query: (body) => ({
        url: `/FavTour/deleteFavTour/`,
        method: "DELETE",
        body,
        }), 
      invalidatesTags:["category"]
    }),
  }),
});

export const { useGetFavTourQuery,useDeleteFavTourMutation } = favTour;
