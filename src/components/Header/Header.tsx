import { ROUTES } from '@/const/routing'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/icons/logo.svg'
import { Button } from '../ui/button'

interface Props {
  className?: string
}

export const Header = ({ className }: Props) => {
  return (
    <div className={cn('bg-white shadow-sm py-[22px]', className)}>
      <div className="box flex items-center justify-between gap-x-10">
        <div className="flex gap-x-12 items-center">
          <Link
            href={ROUTES.main}
            className="relative w-[222px] h-[34px] block shrink-0"
          >
            <Image fill src={logo} alt={'Netowork'} />
          </Link>
          <div className="flex items-center gap-x-8 leading-none">
            <Link href={'/'}>Создать задание</Link>
            <Link href={'/'}>Найти задания</Link>
          </div>
        </div>
        <div>
          <Button size="lg" href={ROUTES.login}>
            Вход и регистрация
          </Button>
        </div>
      </div>
    </div>
  )
}
