import { UserRole } from '@/types/user'
import { z } from 'zod'
import zxcvbn from 'zxcvbn'

export const registerSchema = z
  .object({
    role: z.enum([UserRole.Client, UserRole.Freelancer]),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email('Некорректный эл. адрес'),
    password: z.string().min(8, 'Минимальная длина пароля 8 символов'),
    passwordConfirm: z.string(),
    agreeTerms: z.boolean(),
  })
  .superRefine(({ password }, ctx) => {
    const result = zxcvbn(password)

    if (result.score == 0 || result.score == 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: 'Пароль слишком простой',
      })
    }
  })
  .refine(obj => obj.password === obj.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Пароли не совпадают',
  })
  .refine(obj => obj.agreeTerms, {
    path: ['agreeTerms'],
    message: 'Вы должны согласиться с условиями',
  })

export type RegisterSchema = z.infer<typeof registerSchema>
