import { createApi } from "@reduxjs/toolkit/query/react";
import { dynamicBaseQuery } from "./BadRequestHandler/BadRequestHandler";

export const courseCategories = createApi({
  reducerPath: "courseCategories",
  baseQuery: dynamicBaseQuery,
  tagTypes:["courseCategories"],
  endpoints: (builder) => ({
    courseAddCategory: builder.mutation({
      query: (body) => ({
        url: "/course/add-category",
        method: "POST",
        body,
      }),
      invalidatesTags:["courseCategories"]
    }),
    courseEditCategory: builder.mutation({
      query: (body) => ({
        url: "/course/edit-category",
        method: "PUT",
        body,
      }),
      invalidatesTags:["courseCategories"]
    }),
    courseGetCategory: builder.query({
      query: (body) => ({
        url: "/course/get-category",
        method: "GET",
        body,
      }),
      providesTags:["courseCategories"]
    }),
    delNewCourseCategory: builder.mutation({
      query: (body) => ({
        url: "/course/delete-category",
        method: "DELETE",
        body,
      }),
      invalidatesTags:["courseCategories"]
    }),
    addNewCourseCategory: builder.mutation({
      query: (body) => ({
        url: "/course/add-newCourseCategory",
        method: "POST",
        body,
      }),
      invalidatesTags:["courseCategories"]
    }),
    deleteNewCourseSkill: builder.mutation({
      query: (body) => ({
        url: "/course/delete-newCourse-skill",
        method: "DELETE",
        body,
      }),
      invalidatesTags:["courseCategories"]
    }),
    getNewCourseCategory: builder.query({
      query: (body) => (
        {
        url: `/course/get-newCourseCategory/${body}`,
        method: "GET",
      }),
      providesTags:["courseCategories"]
    }),
  }),
});

export const { useCourseAddCategoryMutation, useCourseGetCategoryQuery, useAddNewCourseCategoryMutation,useDelNewCourseCategoryMutation, useGetNewCourseCategoryQuery,useCourseEditCategoryMutation, useDeleteNewCourseSkillMutation} = courseCategories;
