import { ROUTES } from '@/const/routing'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { InputWithLabel } from '../ui/InputWithLabel'
import { Button } from '../ui/button'

interface Props {
  className?: string
}

export const SignInForm = ({ className }: Props) => {
  return (
    <form
      className={cn(
        'max-w-[450px] w-full mx-auto px-4 py-8 sm:px-6 rounded-2xl shadow-md bg-white',
        className
      )}
    >
      <div className="flex flex-col items-center gap-y-6 sm:gap-y-8">
        <span className="text-[22px] font-bold leading-[130%] sm:text-[25px]">
          Авторизация
        </span>
        <div className="w-full">
          <InputWithLabel className="mb-5" label="email" />
          <InputWithLabel className="mb-3" label="пароль" />
          <Link className="text-sm leading-[143%]" href={ROUTES.resetPassword}>
            Восстановить пароль
          </Link>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Button type="button" size="lg">
            Войти
          </Button>
          <Button
            href={ROUTES.register}
            type="button"
            variant="secondary"
            size="lg"
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </form>
  )
}
