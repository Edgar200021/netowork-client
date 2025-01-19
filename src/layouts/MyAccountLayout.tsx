import { MyAccount } from '@/components/MyAccount'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { authSlice } from '@/store/auth/authSlice'
import { useAppSelector } from '@/store/store'
import { Navigate, NavLink, Outlet } from 'react-router'

interface Props {
  className?: string
}

export const MyAccountLayout = ({ className }: Props) => {
  const user = useAppSelector(authSlice.selectors.getUser)

  if (!user) return <Navigate to={ROUTES.login} />

  return (
    <div className={cn('', className)}>
      <MyAccount user={user} className="mb-[50px]" />
      <div className="flex items-center gap-x-6">
        <NavLink
          className="text-lg leading-[133%] pb-3 aria-[current=page]:border-b-2 aria-[current=page]:border-b-primary"
		  end={true}
          to={ROUTES.profile}
        >
          Обо мне
        </NavLink>
        <NavLink
          className="text-lg leading-[133%] pb-3 aria-[current=page]:border-b-2 aria-[current=page]:border-b-primary"
          to={ROUTES.profileSettings}
        >
          Настройки
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}
