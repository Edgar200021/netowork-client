import { z } from 'zod'
import zxcvbn from 'zxcvbn'

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, 'Минимальная длина пароля 8 символов'),
    passwordConfirm: z.string(),
  })
  .superRefine(({ newPassword }, ctx) => {
    const result = zxcvbn(newPassword)

    if (result.score == 0 || result.score == 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Пароль слишком простой',
      })
    }
  })
  .refine(obj => obj.newPassword === obj.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Пароли не совпадают',
  })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
