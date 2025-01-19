import { ApiSuccessResponse } from '@/types/api'
import { PortfolioJob } from '@/types/portfolio'

export type GetMyPortfolioRequest = null
export type GetMyPortfolioResponse = ApiSuccessResponse<PortfolioJob[]>
