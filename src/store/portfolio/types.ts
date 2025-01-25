import { ApiSuccessResponse } from '@/types/api'
import { PortfolioJob } from '@/types/portfolio'

export type GetMyPortfolioRequest = null
export type GetMyPortfolioResponse = ApiSuccessResponse<PortfolioJob[]>

export type DeletePortfolioJobRequest = {
  id: PortfolioJob['id']
}
export type DeletePortfolioJobResponse = ApiSuccessResponse<null>
