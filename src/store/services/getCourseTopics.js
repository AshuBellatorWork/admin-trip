// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { dynamicBaseQuery } from './BadRequestHandler/BadRequestHandler'

// Define a service using a base URL and expected endpoints
export const getCourseTopic = createApi({
    reducerPath: 'getCourseTopic',
    baseQuery:dynamicBaseQuery,
    endpoints: (builder) => ({
        getCourseTopic: builder.mutation({
            query: (body) => ({
                url: `/course/get-topics`,
                method: 'POST',
                body
            }),
        }),
        
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCourseTopicMutation } = getCourseTopic