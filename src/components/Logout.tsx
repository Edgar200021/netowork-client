import { ROUTES } from '@/constants/routes'
import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { useLogoutMutation } from '@/store/auth/authApi'
import { useNavigate } from 'react-router'
import { Button } from './ui/button'

interface Props {
  className?: string
}

export const Logout = ({ className }: Props) => {
  const [logout, { isLoading, error, data }] = useLogoutMutation()
  const navigate = useNavigate()

  useHandleError(error)
  useHandleApiResponse(data, {
    callback: () => navigate(ROUTES.main),
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
