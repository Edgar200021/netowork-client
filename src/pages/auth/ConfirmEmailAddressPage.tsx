import { ConfirmEmailAddress } from '@/components/ConfirmEmailAddress'
import { useQueryParams } from '@/hooks/useQueryParams'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const ConfirmEmailAddressPage = ({ className }: Props) => {
  const { params } = useQueryParams('email')

  if (!params.email?.trim()) return null

  return (
    <main className={cn(className, 'box')}>
      <ConfirmEmailAddress email={params.email} />
    </main>
  )
}
