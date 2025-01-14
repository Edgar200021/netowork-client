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

export type SetNewEmailAddressRequest = {
  oldEmail: string
  newEmail: string
}
export type SetNewEmailAddressResponse = ApiSuccessResponse<string>

export type ForgotPasswordRequest = {
  email: string
}
export type ForgotPasswordResponse = ApiSuccessResponse<string>

export type ResetPasswordRequest = {
  token: string
  password: string
}
export type ResetPasswordResponse = ApiSuccessResponse<string>

export type LogoutRequest = null
export type LogoutResponse = ApiSuccessResponse<string>
