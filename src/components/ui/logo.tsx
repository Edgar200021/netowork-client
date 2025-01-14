import { cn } from '@/lib/utils'

import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router'
import sprites from '../../assets/icons/sprites.svg'
interface Props {
  className?: string
  onlyTitle?: boolean
}

export const Logo = ({ className, onlyTitle = false }: Props) => {
  return (
    <div
      className={cn(className, 'cursor-pointer w-fit', {
        'flex items-center gap-x-[10px] relative': !onlyTitle,
      })}
    >
      <Link to={ROUTES.main} className='absolute inset-0 w-full h-full' />
      <svg width={32} height={28}>
        <use xlinkHref={`${sprites}#logo`} />
      </svg>
      <svg height={24} className="w-[120px] sm:w-[140px] lg:w-[179px]">
        <use xlinkHref={`${sprites}#logo-title`} />
      </svg>
    </div>
  )
}
