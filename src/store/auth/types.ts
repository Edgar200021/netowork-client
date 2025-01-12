import { ApiSuccessResponse } from '@/types/api'
import { User, UserRole } from '@/types/user'

export type RegisterRequest = {
  role: UserRole.Client | UserRole.Freelancer
  firstName: string
  lastName: string
  email: string
  password: string
}
export type RegisterResponse = ApiSuccessResponse<string>

export type LoginRequest = {
  email: string
  password: string
}
export type LoginResponse = ApiSuccessResponse<User>

export type VerifyAccountRequest = {
  token: string
}
export type VerifyAccountResponse = ApiSuccessResponse<User>

export type SendVerificationEmailRequest = {
  email: string
}
export type SendVerificationEmailResponse = ApiSuccessResponse<string>
