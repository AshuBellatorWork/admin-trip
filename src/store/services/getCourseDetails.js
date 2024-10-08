// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from './BadRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const getCourseDetails = createApi({
    reducerPath: 'getCourseDetails',
    baseQuery:dynamicBaseQuery,
    tagTypes: ['Get Course Details'],
    endpoints: (builder) => ({
        getCourseDetails: builder.query({
            query: (body) => ({
                url: `course/get-course-detail`,
                method: 'POST',
                body
            }),
            providesTags:["Get Course Details"]
        }),
        editCourseTopics: builder.mutation({
            query: (body) => ({
                url: `course/edit-course-topics`,
                method: 'PUT',
                body
            }),
            invalidatesTags:["Get Course Details"]
        }),
        editCourseSyllabus: builder.mutation({
            query: (body) => ({
                url: `course/edit-course-syllabus`,
                method: 'PUT',
                body
            }),
            invalidatesTags:["Get Course Details"]
        }),
        courseDetails: builder.mutation({
            query: (body) => ({
              url: "add-courses/detail",
              method: "POST",
              body,
            }),
            invalidatesTags:["Get Course Details"]
          }),
        courseTopicDel: builder.mutation({
            query: (body) => ({
              url: "course/delete-course-topics",
              method: "DELETE",
              body,
            }),
            invalidatesTags:["Get Course Details"]
          }),
        courseSyllabusDel: builder.mutation({
            query: (body) => ({
              url: "course/delete-course-syllabus",
              method: "DELETE",
              body,
            }),
            invalidatesTags:["Get Course Details"]
          }),
        
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCourseDetailsQuery,useEditCourseTopicsMutation ,useEditCourseSyllabusMutation,useCourseDetailsMutation, useCourseTopicDelMutation, useCourseSyllabusDelMutation } = getCourseDetails