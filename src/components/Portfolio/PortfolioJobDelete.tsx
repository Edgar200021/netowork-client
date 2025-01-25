import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { useDeletePortfolioJobMutation } from '@/store/portfolio/portfolioApi'
import { PortfolioJob } from '@/types/portfolio'
import { Button } from '../ui/button'

interface Props {
  className?: string
  id: PortfolioJob['id']
}

export const PortfolioJobDelete = ({ className, id }: Props) => {
  const [deletePortfolioJob, { isLoading, error }] =
    useDeletePortfolioJobMutation()

  useHandleError(error)

  return (
    <Button
      onClick={() => deletePortfolioJob({ id })}
      disabled={isLoading}
      variant="ghost"
      className={cn(
        'w-[44px] h-[44px] rounded-full flex items-center justify-center bg-black/50 text-3xl  text-white',
        className
      )}
    >
      <span className="-translate-y-1"> &times;</span>
    </Button>
  )
}
