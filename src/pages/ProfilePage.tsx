import { AboutMeInfo } from '@/components/AboutMe/AboutMeInfo'
import { PortfolioList } from '@/components/Works/WorkLIst'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { authSlice } from '@/store/auth/authSlice'
import { useAppSelector } from '@/store/store'
import { UserRole } from '@/types/user'
import { Navigate } from 'react-router'

interface Props {
  className?: string
}

export const ProfilePage = ({ className }: Props) => {
  const user = useAppSelector(authSlice.selectors.getUser)

  if (!user) return <Navigate to={ROUTES.login} />

  return (
    <main className={cn('', className)}>
      <AboutMeInfo
        className={cn({
          'mb-[50px] md:mb-10': user.role === UserRole.Freelancer,
        })}
        aboutText={user.aboutMe || ''}
      />
      {user.role === UserRole.Freelancer && <PortfolioList className='max-sm:box' />}
    </main>
  )
}
