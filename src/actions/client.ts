import { ROUTES } from '@/const/routing'
import { UnauthorizedError } from '@/error/error'
import { createSafeActionClient } from 'next-safe-action'
import { redirect } from 'next/navigation'

export const actionClient = createSafeActionClient({
  handleServerError(err) {
    if (err instanceof UnauthorizedError) {
      redirect(ROUTES.login)
    }
  },
})
