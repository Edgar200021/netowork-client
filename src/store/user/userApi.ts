import { authSlice } from '../auth/authSlice'
import { baseApi } from '../baseApi'
import { GetMeRequest, GetMeResponse } from './types'

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
    }),
  }),
})

export const { useGetMeQuery } = userApi
