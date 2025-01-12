import { ApiError, ApiValidationError } from '@/types/api'

export const isApiError = (error: unknown): error is ApiError => {
  const err = error as ApiError

  return err.status === 'error' && err.error !== undefined
}

export const isApiValidationError = <T extends string[]>(
  error: unknown
): error is ApiValidationError<T> => {
  const err = error as ApiValidationError<T>

  return err.errors !== undefined
}
