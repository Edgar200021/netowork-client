import { TAGS } from '@/constants/redux'
import { authSlice } from '../auth/authSlice'
import { baseApi } from '../baseApi'
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetMeRequest,
  GetMeResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
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
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: body => ({
        url: '/users/update-profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAGS.user],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: body => ({
        url: '/users/change-password',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi
