import { ConfirmEmailAddress } from '@/components/ConfirmEmailAddress'
import { useQueryParams } from '@/hooks/useQueryParams'

interface Props {
  className?: string
}

export const ConfirmEmailAddressPage = ({ className }: Props) => {
  const { params } = useQueryParams('email')

  console.log(params)

  if (!params.email?.trim()) return null

  return (
    <main className={className}>
      <ConfirmEmailAddress email={params.email} />
    </main>
  )
}
