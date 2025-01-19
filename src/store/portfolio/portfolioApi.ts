import { baseApi } from '../baseApi'
import { GetMyPortfolioRequest, GetMyPortfolioResponse } from './types'

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPortfolio: builder.query<
      GetMyPortfolioResponse,
      GetMyPortfolioRequest
    >({
      query: () => ({
        url: '/portfolio/my-portfolio',
      }),
    }),
  }),
})

export const { useGetMyPortfolioQuery } = portfolioApi
