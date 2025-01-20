import { AboutMeInfo } from '@/components/AboutMe/AboutMeInfo'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { authSlice } from '@/store/auth/authSlice'
import { useAppSelector } from '@/store/store'
import { Navigate } from 'react-router'

interface Props {
  className?: string
}

export const ProfilePage = ({ className }: Props) => {
  const user = useAppSelector(authSlice.selectors.getUser)

  if (!user) return <Navigate to={ROUTES.login} />

  return (
    <main className={cn('', className)}>
      <AboutMeInfo aboutText={user.aboutMe || ''} />
    </main>
  )
}
