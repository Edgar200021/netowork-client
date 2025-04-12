import type { ApiSuccessResponse } from '@/types/api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const useHandleApiResponse = <T>(
  data?: ApiSuccessResponse<T>,
  options: {
    showToast?: boolean
    callback?: (...args: unknown[]) => void
    toastText?: string
  } = {
    showToast: true,
  }
) => {
  useEffect(() => {
    if (!data) return

    if (typeof data.data === 'string' && (options.showToast ?? true)) {
      toast.success(data.data)
    } else if (options.toastText) {
      toast.success(options.toastText)
    }

    options.callback?.()
  }, [data, options.showToast])
}
