import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from '@/schemas/auth/changePasswordSchema'
import { useChangePasswordMutation } from '@/store/user/userApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { FieldErrors } from '../FieldError'
import { PasswordInput } from '../PasswordInput'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props {
  className?: string
}

export const ChangePasswordForm = ({ className }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  })
  const [changePassword, { isLoading, error, data }] =
    useChangePasswordMutation()
  const { apiValidationErrors } =
    useHandleError<(keyof Omit<ChangePasswordSchema, 'passwordConfirm'>)[]>(
      error
    )

  useHandleApiResponse(data, {
    callback: () =>
      reset({ newPassword: '', newPasswordConfirmation: '', oldPassword: '' }),
    showToast: true,
  })

  const onSubmit = (data: ChangePasswordSchema) => {
    changePassword(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('', className)}>
      <span className="text-[22px] font-bold leading-[130%] block mb-4">
        Измените пароль
      </span>
      <span className="leading-[140%] block mb-4">
        Рекомендованные требования
      </span>
      <div className="flex flex-col gap-y-2 mb-6">
        <div className="flex items-center gap-x-2">
          <span className="text-primary">&#10003;</span>
          <span>длина — не менее 8 символов;</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-primary">&#10003;</span>
          <span>заглавные буквы;</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-primary">&#10003;</span>
          <span>строчные буквы;</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-primary">&#10003;</span>
          <span>цифры или специальные символы: %, #, $ и другие.</span>
        </div>
      </div>
      <fieldset className="m-0 p-0" disabled={isLoading}>
        <div className="flex flex-col gap-y-5 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-5 mb-6">
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <PasswordInput
                inputProps={field}
                calculateStrength={false}
                label="Старый пароль"
              >
                {(apiValidationErrors?.oldPassword ||
                  errors.oldPassword?.message) && (
                  <FieldErrors
                    error={
                      apiValidationErrors?.oldPassword ||
                      errors.oldPassword!.message!
                    }
                  />
                )}
              </PasswordInput>
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <PasswordInput inputProps={field} label="Новый пароль">
                {(apiValidationErrors?.newPassword ||
                  errors.newPassword?.message) && (
                  <FieldErrors
                    error={
                      apiValidationErrors?.newPassword ||
                      errors.newPassword!.message!
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
            <Input {...register('newPasswordConfirmation')} required type="password" />
            {errors.newPasswordConfirmation?.message && (
              <FieldErrors error={errors.newPasswordConfirmation.message} />
            )}
          </label>
        </div>
        <Button className="w-full md:w-fit">
          {isLoading ? 'Загрузка...' : 'Сохранить'}
        </Button>
      </fieldset>
    </form>
  )
}
