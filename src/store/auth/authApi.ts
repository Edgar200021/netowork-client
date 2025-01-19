import { baseApi } from '../baseApi'
import { authSlice } from './authSlice'
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendVerificationEmailRequest,
  SendVerificationEmailResponse,
  SetNewEmailAddressRequest,
  SetNewEmailAddressResponse,
  VerifyAccountRequest,
  VerifyAccountResponse,
} from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(authSlice.actions.setUser(data.data))
        dispatch(authSlice.actions.setIsAuthorized(true))
      },
    }),
    verifyAccount: builder.mutation<
      VerifyAccountResponse,
      VerifyAccountRequest
    >({
      query: body => ({
        url: '/auth/verify',
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled

        dispatch(authSlice.actions.setUser(data.data))
      },
    }),
    sendVerificationEmail: builder.mutation<
      SendVerificationEmailResponse,
      SendVerificationEmailRequest
    >({
      query: body => ({
        url: '/auth/send-verification-email',
        method: 'POST',
        body,
      }),
    }),
    setNewEmailAddress: builder.mutation<
      SetNewEmailAddressResponse,
      SetNewEmailAddressRequest
    >({
      query: body => ({
        url: '/auth/set-new-email-address',
        method: 'PATCH',
        body,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: body => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: body => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        body: {},
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyAccountMutation,
  useSendVerificationEmailMutation,
  useSetNewEmailAddressMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi
