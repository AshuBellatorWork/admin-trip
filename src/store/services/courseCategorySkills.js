import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const courseCategorySkills = createApi({
  reducerPath: "courseCategorySkills",
  baseQuery: dynamicBaseQuery,
  tagTypes:["courseCategorySkills"],
  endpoints: (builder) => ({
    courseAddCategorySkill: builder.mutation({
      query: (body) => ({
        url: "/course/add-skill",
        method: "POST",
        body,
      }),
      invalidatesTags:["courseCategorySkills"]
    }),
    courseGetCategorySkill: builder.query({
      query: (body) => ({
        url: "/course/get-skill",
        method: "GET",
        body,
      }),
      providesTags:["courseCategorySkills"]
    }),
    courseDeleteCategorySkill: builder.mutation({
      query: (body) => ({
        url: "/course/delete-skill",
        method: "DELETE",
        body,
      }),
      invalidatesTags:["courseCategorySkills"]
    }),
    courseEditCategorySkill: builder.mutation({
      query: (body) => ({
        url: "/course/edit-skill",
        method: "PUT",
        body,
      }),
      invalidatesTags:["courseCategorySkills"]
    }),
  }),
});

export const { useCourseAddCategorySkillMutation, useCourseGetCategorySkillQuery,useCourseDeleteCategorySkillMutation, useCourseEditCategorySkillMutation } = courseCategorySkills;
