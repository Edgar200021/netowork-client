import { User } from '@/types/user'
import { ApiSuccessResponse } from '../../types/api'

export type GetMeRequest = null
export type GetMeResponse = ApiSuccessResponse<User>

export type ChangeAboutMeRequest = {
  aboutMe: string
}
export type ChangeAboutMeResponse = ApiSuccessResponse<string>
