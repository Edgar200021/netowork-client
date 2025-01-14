import { ROUTES } from '@/constants/routes'
import { authSlice } from '@/store/auth/authSlice'
import { useAppSelector } from '@/store/store'
import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'

export const ProtectedPage = () => {
  const user = useAppSelector(authSlice.selectors.getUser),
    isAuthorized = useAppSelector(authSlice.selectors.getIsAuthorized)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthorized) return

    navigate(ROUTES.login)
  }, [isAuthorized])

  return user ? <Outlet/> : <Navigate to={ROUTES.login} />
}
