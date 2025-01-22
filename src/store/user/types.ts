import { User } from '@/types/user'
import { ApiSuccessResponse } from '../../types/api'

export type GetMeRequest = null
export type GetMeResponse = ApiSuccessResponse<User>

export type UpdateProfileRequest = Partial<
  Pick<User, 'aboutMe' | 'firstName' | 'lastName' | 'email'>
>
export type UpdateProfileResponse = ApiSuccessResponse<string>

export type ChangePasswordRequest = {
	oldPassword: string 
	newPassword: string
}
export type ChangePasswordResponse = ApiSuccessResponse<string>