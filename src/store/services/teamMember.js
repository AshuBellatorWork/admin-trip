import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const getAllTeamMember = createApi({
  reducerPath: "getAllTeamMember",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["GetTeamMembers"],
  endpoints: (builder) => ({
    getAllTeamMember: builder.query({
      query: (body) => ({
        url: "/team/get-all-team-member",
        method: "GET",
        body,
      }),
      providesTags: ["GetTeamMembers"],
    }),
    createTeamMember: builder.mutation({
      query: (body) => ({
        url: "/team/create-team-member",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetTeamMembers"],
    }),
    editTeamMember: builder.mutation({
      query: (body) => ({
        url: `/team/edit-team-member/${body?.id}`,
        method: "PUT",
        body: body?.data,
      }),
      invalidatesTags: ["GetTeamMembers"],
    }),
    deleteTeamMember: builder.mutation({
      query: (body) => ({
        url: `/team/delete-team-member/${body}`,
        method: "PUT",
      }),
      invalidatesTags: ["GetTeamMembers"],
    }),
  }),
});

export const {
  useGetAllTeamMemberQuery,
  useCreateTeamMemberMutation,
  useEditTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = getAllTeamMember;
