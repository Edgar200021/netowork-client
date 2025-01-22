import { ROUTES } from '@/constants/routes'
import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { useLogoutMutation } from '@/store/auth/authApi'
import { authSlice } from '@/store/auth/authSlice'
import { useAppDispatch } from '@/store/store'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'

interface Props {
  className?: string
}

export const Logout = ({ className }: Props) => {
  const [logout, { isLoading, error, data }] = useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useHandleError(error)
  useHandleApiResponse(data, {
    callback: () => {
      setTimeout(() => {
        dispatch(authSlice.actions.setUser(undefined))
        dispatch(authSlice.actions.setIsAuthorized(false))
      }, 100)
      navigate(ROUTES.main)
    },
  })

  return (
    <Button
      onClick={() => {
        logout(null)
      }}
      disabled={isLoading}
      variant="ghost"
      className={cn(
        'hover:no-underline rounded-xl py-2 px-3 w-full justify-start',
        className
      )}
    >
      {isLoading ? 'Загрузка...' : 'Выйти'}
    </Button>
  )
}
