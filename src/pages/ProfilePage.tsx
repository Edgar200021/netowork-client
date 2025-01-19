import { cn } from '@/lib/utils'
import { useGetMyPortfolioQuery } from '@/store/portfolio/portfolioApi'

interface Props {
  className?: string
}

export const ProfilePage = ({ className }: Props) => {
  const { data } = useGetMyPortfolioQuery(null)

  return <main className={cn('', className)}></main>
}
