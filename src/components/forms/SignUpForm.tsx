'use client'
import { signUpAction } from '@/actions/auth/sign_up'
import { SIGN_UP_FORM } from '@/const/form'
import { ROUTES } from '@/const/routing'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { InputWithLabel } from '../ui/InputWithLabel'
import { PasswordInput } from '../ui/PasswordInput'

interface Props {
  className?: string
}

const Role = () => {
  const [role, setRole] = useState<'client' | 'freelancer'>()

  return (
    <div className="flex w-full justify-between rounded-xl ">
      <label
        className={cn(
          'py-2 px-3 flex items-center justify-center w-1/2 border-[2px] rounded-l-[10px] border-r-[0] border-border-primary leading-[137%] cursor-pointer transition-colors duration-300 ease',
          {
            'border-primary-200 border-r-[2px]': role === 'freelancer',
          }
        )}
      >
        <input
          required
          onChange={e => setRole(e.target.value as 'client' | 'freelancer')}
          value={'freelancer'}
          className="fixed opacity-0 pointer-events-none"
          name={SIGN_UP_FORM.role}
          type="radio"
        />
        Я фрилансер
      </label>
      <label
        className={cn(
          'py-2 px-3 flex items-center justify-center w-1/2 border-[2px] rounded-r-[10px] border-l-[0] border-border-primary leading-[137%] cursor-pointer transition-colors duration-300 ease',
          {
            'border-primary-200 border-l-[2px]': role === 'client',
          }
        )}
      >
        <input
          required
          onChange={e => setRole(e.target.value as 'client' | 'freelancer')}
          value={'client'}
          className="fixed opacity-0 pointer-events-none"
          name={SIGN_UP_FORM.role}
          type="radio"
        />
        Я заказчик
      </label>
    </div>
  )
}

export const SignUpForm = ({ className }: Props) => {
  const toast = useToast()

  const { execute, isPending, result } = useAction(signUpAction, {
    onSuccess: ({ data }) => {
      if (data?.message) {
        toast(data.message, 'error')
      }
    },
  })

  console.log(result)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(form)

        //@ts-ignore
        execute(data)
      }}
      className={cn(
        'max-w-[450px] w-full mx-auto px-4 py-8 sm:px-6 rounded-2xl shadow-md bg-white',
        className
      )}
    >
      <div className="flex flex-col items-center gap-y-6 sm:gap-y-8">
        <span className="text-[22px] font-bold leading-[130%] sm:text-[25px]">
          Регистрация
        </span>
        <Role />
        <div className="w-full">
          <InputWithLabel
            required
            name={SIGN_UP_FORM.firstName}
            className="mb-5"
            label="имя"
          >
            {(!!result.validationErrors?.first_name ||
              result.data?.first_name) && (
              <span className="text-sm text-error">
                {!!result.validationErrors?.first_name![0] ||
                  result.data?.first_name}
              </span>
            )}
          </InputWithLabel>
          <InputWithLabel
            required
            name={SIGN_UP_FORM.lastName}
            className="mb-3"
            label="фамилия"
          >
            {(!!result.validationErrors?.last_name?.length ||
              result.data?.last_name) && (
              <span className="text-sm text-error">
                {result.validationErrors?.last_name![0] ||
                  result.data?.last_name}
              </span>
            )}
          </InputWithLabel>
          <InputWithLabel
            required
            type="email"
            name={SIGN_UP_FORM.email}
            className="mb-5"
            label="email"
          >
            {(!!result.validationErrors?.email?.length ||
              result.data?.email) && (
              <span className="text-sm text-error">
                {result.validationErrors?.email || result.data?.email}
              </span>
            )}
          </InputWithLabel>
          <PasswordInput required name={SIGN_UP_FORM.password} className="mb-5">
            {(!!result.validationErrors?.password?.length ||
              result.data?.password) && (
              <span className="text-sm text-error">
                {result.validationErrors?.password![0] || result.data?.password}
              </span>
            )}
          </PasswordInput>
          <InputWithLabel
            type="password"
            name="password_confirm"
            className="mb-3"
            label="Подтверждение пароля"
            required
          >
            {(!!result.validationErrors?.password?.length ||
              result.data?.password) && (
              <span className="text-sm text-error">
                {result.validationErrors?.password![0] || result.data?.password}
              </span>
            )}
          </InputWithLabel>
          <Link className="text-sm leading-[143%]" href={ROUTES.resetPassword}>
            Согласен с Privacy policy
          </Link>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Button disabled={isPending} size="lg">
            Зарегистрироваться
          </Button>
          <Button
            disabled={isPending}
            href={ROUTES.login}
            type="button"
            variant="secondary"
            size="lg"
          >
            Уже есть аккаунт
          </Button>
        </div>
      </div>
    </form>
  )
}
