import { ROUTES } from '@/const/routing'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/icons/logo-text.svg'
interface Props {
  className?: string
}

export const Footer = ({ className }: Props) => {
  return (
    <footer className={cn('bg-white py-20', className)}>
      <div className="box flex gap-x-28 ">
        <div className="flex flex-col gap-y-[20px] justify-between">
          <Link href={ROUTES.main}>
            <Image width={172} height={24} src={logo} alt="Netowork" />
          </Link>
          <span>
            © 2022 Netowork
            <br />
            Все права защищены
          </span>
        </div>
        <div className="flex flex-col gap-y-4">
          <Link href={ROUTES.main}>О платформе</Link>
          <Link href={ROUTES.main}>Как разместить заказ</Link>
          <Link href={ROUTES.main}>Как получить заказ</Link>
          <Link href={ROUTES.main}>Служба поддержки</Link>
        </div>

        <div className="flex flex-col gap-y-4 ml-auto">
          <Link href={ROUTES.main}>Правила работы сервиса</Link>
          <Link href={ROUTES.main}>Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  )
}
