import { baseApi } from '../baseApi'
import { authSlice } from './authSlice'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationEmailRequest,
  SendVerificationEmailResponse,
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

        console.log(data)

        dispatch(authSlice.actions.setUser(data.data))
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
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyAccountMutation,
  useSendVerificationEmailMutation,
} = authApi
