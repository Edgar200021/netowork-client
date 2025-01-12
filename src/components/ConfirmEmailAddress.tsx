import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import { useSendVerificationEmailMutation } from '@/store/auth/authApi'
import { Button } from './ui/button'

interface Props {
  className?: string
  email: string
}

export const ConfirmEmailAddress = ({ className, email }: Props) => {
  const [sendVerificationEmail, { isLoading, data, error }] =
    useSendVerificationEmailMutation()

  useHandleApiResponse(data)
  useHandleError(error)

  const onClick = () => {
    sendVerificationEmail({
      email,
    })
  }

  return (
    <div
      className={cn(
        className,
        'text-center py-8 px-4 rounded-[16px] bg-white shadow-form max-w-[450px] mx-auto md:px-6'
      )}
    >
      <h1 className="text-center font-bold text-[22px] leading-[130%] mb-8">
        Подтвердите адрес вашей почты
      </h1>
      <p className="text-center leading-[140%] mb-5">
        На ваш электронный адрес
        <span className="text-link px-1">{email}</span> отправлено письмо с
        проверочным кодом. Введите полученный код в поле ниже и нажмите
        продолжить
      </p>
      <p className="mb-8">
        Пройдите по ссылке и активируйте вашу электронную почту
      </p>
      <div className="flex flex-col gap-y-5">
        <Button
          onClick={onClick}
          disabled={isLoading}
          variant="link"
          className="underline p-0 text-wrap"
        >
          Отправить новое письмо для подтверждения почты
        </Button>
        <Button disabled={isLoading} variant="link" className="p-0">
          Указать другую почту
        </Button>
      </div>
    </div>
  )
}
