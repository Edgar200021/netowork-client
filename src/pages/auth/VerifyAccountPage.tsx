import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'
import { VerifyAccount } from '../../components/VerifyAccount'

interface Props {
  className?: string
}

export const VerifyAccountPage = ({ className }: Props) => {
  const { params } = useQueryParams('token')

  if (!params.token) return null

  return (
    <main className={cn(className)}>
      <VerifyAccount token={params.token} />
    </main>
  )
}
