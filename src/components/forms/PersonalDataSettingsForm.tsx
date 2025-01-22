import { useHandleApiResponse } from '@/hooks/useHandleApiResponse'
import { useHandleError } from '@/hooks/useHandleError'
import { cn } from '@/lib/utils'
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from '@/schemas/users/updateProfileSchema'
import { useUpdateProfileMutation } from '@/store/user/userApi'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FieldErrors } from '../FieldError'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface Props extends Pick<User, 'firstName' | 'lastName' | 'email'> {
  className?: string
}

export const PersonalDataSettingsForm = ({
  className,
  firstName,
  lastName,
  email,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { firstName, lastName, email },
  })
  const [updateProfile, { isLoading, error, data }] = useUpdateProfileMutation()
  const { apiValidationErrors } =
    useHandleError<(keyof UpdateProfileSchema)[]>(error)
  useHandleApiResponse(data)

  const onSubmit = (data: UpdateProfileSchema) => {
    if (
      data.firstName.trim() === firstName &&
      data.lastName.trim() === lastName &&
      data.email.trim() === email
    )
      return

    updateProfile({
      firstName: data.firstName === firstName ? undefined : data.firstName,
      lastName: data.lastName === lastName ? undefined : data.lastName,
      email: data.email === email ? undefined : data.email,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('', className)}>
      <span className="text-[22px] font-bold leading-[130%] block mb-6">
        Личные данные
      </span>
      <fieldset disabled={isLoading} className="m-0 p-0">
        <div className="flex flex-col gap-y-5 mb-8 md:flex-row md:gap-y-0 md:grid md:grid-cols-3 md:gap-x-8 ">
          <label className="flex flex-col gap-y-2">
            <span className="leading-[140%] text-secondary-foreground">
              Имя
            </span>
            <Input {...register('firstName')} required />
            {(apiValidationErrors?.firstName || errors.firstName?.message) && (
              <FieldErrors
                error={
                  apiValidationErrors?.firstName || errors.firstName!.message!
                }
              />
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="leading-[140%] text-secondary-foreground">
              Фамилия
            </span>
            <Input {...register('lastName')} required />
            {(apiValidationErrors?.lastName || errors.lastName?.message) && (
              <FieldErrors
                error={
                  apiValidationErrors?.lastName || errors.lastName!.message!
                }
              />
            )}
          </label>
          <label className="flex flex-col gap-y-2">
            <span className="leading-[140%] text-secondary-foreground">
              Email
            </span>
            <Input {...register('email')} type="email" required />
            {(apiValidationErrors?.email || errors.email?.message) && (
              <FieldErrors
                error={apiValidationErrors?.email || errors.email!.message!}
              />
            )}
          </label>
        </div>
        <Button className="w-full sm:w-fit ">Сохранить</Button>
      </fieldset>
    </form>
  )
}
