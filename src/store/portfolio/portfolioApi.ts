import { TAGS } from '@/constants/redux'
import { baseApi } from '../baseApi'
import {
  DeletePortfolioJobRequest,
  DeletePortfolioJobResponse,
  GetMyPortfolioRequest,
  GetMyPortfolioResponse,
} from './types'

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPortfolio: builder.query<
      GetMyPortfolioResponse,
      GetMyPortfolioRequest
    >({
      query: () => ({
        url: '/portfolio/my-portfolio',
      }),
      providesTags: [TAGS.portfolio],
    }),
    deletePortfolioJob: builder.mutation<
      DeletePortfolioJobResponse,
      DeletePortfolioJobRequest
    >({
      query: ({ id }) => ({
        url: `/portfolio/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.portfolio],
    }),
  }),
})

export const { useGetMyPortfolioQuery, useDeletePortfolioJobMutation } =
  portfolioApi
