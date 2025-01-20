import { API_BASE_URL } from '@/constants/api'
//import {
//  GET_ME_TAG,
//  PROXIES_TAG,
//  PURCHASED_PROXIES_TAG,
//  RENTED_PROXIES_TAG,
//} from '@/constants/redux'
import { TAGS } from '@/constants/redux'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { authSlice } from './auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    api.dispatch(authSlice.actions.setIsAuthorized(true))
    return result
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    healthCheck: builder.query<string, null>({
      query: () => ({
        url: '/health',
      }),
    }),
  }),
  tagTypes: [TAGS.user],
})
