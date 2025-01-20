import { cn } from '@/lib/utils'
import { Controller, useForm } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/schemas/auth/resetPasswordSchema'
import { useResetPasswordMutation } from '@/store/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { FieldErrors } from '../FieldError'
import { PasswordInput } from '../PasswordInput'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
interface Props {
  className?: string
  token: string
}

export const ResetPasswordForm = ({ className, token }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
    },
  })
  const [resetPassword, { isLoading, data, error }] = useResetPasswordMutation()
  const navigate = useNavigate()
  const { apiValidationErrors } =
    useHandleError<(keyof ResetPasswordSchema)[]>(error)

  useHandleApiResponse(data, {
    callback: () => navigate(ROUTES.login),
  })

  const onSubmit = ({ token, password }: ResetPasswordSchema) => {
    resetPassword({
      password,
      token,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        className,
        'rounded-[16px] py-8 px-4 bg-white shadow-form max-w-[450px] mx-auto'
      )}
    >
      <fieldset disabled={isLoading} className="m-0 p-0">
        <h1 className="text-primary-foreground font-semibold text-[25px] leading-[130%] capitalize text-center mb-8 ">
          Сброс пароля
        </h1>

        <div className="flex flex-col gap-y-3 mb-5">
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput inputProps={field}>
                {(apiValidationErrors?.password ||
                  errors.password?.message) && (
                  <FieldErrors
                    error={
                      apiValidationErrors?.password || errors.password!.message!
                    }
                  />
                )}
              </PasswordInput>
            )}
          />
          <label className="flex flex-col gap-y-2">
            <span className="leading-[140%] text-secondary-foreground">
              Подтверждение пароля
            </span>
            <Input {...register('passwordConfirm')} required type="password" />
            {errors.passwordConfirm?.message && (
              <FieldErrors error={errors.passwordConfirm.message} />
            )}
          </label>
        </div>

        <Button className="w-full">
          {isLoading ? 'Загрузка...' : 'Сбросить'}
        </Button>
      </fieldset>
    </form>
  )
}
