import { isApiError, isApiValidationError } from '@/guards/api'
import { isRtkError } from '@/guards/redux'
import { ApiValidationError } from '@/types/api'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useHandleError = <T extends string[]>(error?: unknown) => {
  const [apiValidationErrors, setApiValidationErrors] =
    useState<ApiValidationError<T>['errors']>()

  useEffect(() => {
    if (!error) return

    const err = isRtkError(error) ? error.data : error

    if (isApiValidationError(err)) {
      setApiValidationErrors(err.errors)
      return
    }

    toast.error(
      isApiError(err)
        ? err.error
        : err instanceof Error
        ? err.message
        : 'Что-то пошло не так'
    )
  }, [error])

  const handleError = useCallback((error: unknown) => {
    if (!error) return
    const err = isRtkError(error) ? error.data : error

    if (isApiValidationError(err)) {
      setApiValidationErrors(err.errors)
    }
    toast.error(
      isApiError(err)
        ? err.error
        : err instanceof Error
        ? err.message
        : 'Что-то пошло не так'
    )
  }, [])

  return { apiValidationErrors, handleError }
}
