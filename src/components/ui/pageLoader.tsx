import { cn } from '@/lib/utils'
import { Loader } from './loader'

interface Props {
  className?: string
}

export const PageLoader = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center',
        className
      )}
    >
      <Loader size={'xl'} />
    </div>
  )
}
