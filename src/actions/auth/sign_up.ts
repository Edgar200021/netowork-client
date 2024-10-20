'use server'

import { signUp } from '@/api/auth/sign-up'
import { ApiBaseError, ApiValidationError } from '@/error/error'
import { SignUpSchema, signUpSchema } from '@/schemas/auth/signUpSchema'
import { isAxiosError } from 'axios'
import { flattenValidationErrors } from 'next-safe-action'
import { actionClient } from '../client'

export type SignUpActionErrors =
  | (Partial<Record<keyof SignUpSchema, string>> & { message: string })
  | undefined

export const signUpAction = actionClient
  .schema(signUpSchema, {
    handleValidationErrorsShape: (ve, utils) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      await signUp(parsedInput)
      await new Promise(res => setTimeout(() => res(5), 5000))
      return undefined
    } catch (error) {
      if (
        isAxiosError<ApiValidationError>(error) &&
        error.response?.data.messages
      ) {
        return error.response?.data.messages as SignUpActionErrors
      }

      if (isAxiosError<ApiBaseError>(error)) {
        return {
          message: error.response?.data.message,
        } as SignUpActionErrors
      }

      throw error
    }
  })
