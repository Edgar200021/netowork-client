import { TAGS } from '@/constants/redux'
import { authSlice } from '../auth/authSlice'
import { baseApi } from '../baseApi'
import {
  ChangeAboutMeRequest,
  ChangeAboutMeResponse,
  GetMeRequest,
  GetMeResponse,
} from './types'

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<GetMeResponse, GetMeRequest>({
      query: () => ({
        url: '/users/get-me',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled

        dispatch(authSlice.actions.setUser(data.data))
        dispatch(authSlice.actions.setIsAuthorized(true))
      },
      providesTags: [TAGS.user],
    }),
    changeAboutMe: builder.mutation<
      ChangeAboutMeResponse,
      ChangeAboutMeRequest
    >({
      query: body => ({
        url: '/users/change-about-me',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAGS.user],
    }),
  }),
})

export const { useGetMeQuery, useChangeAboutMeMutation } = userApi
