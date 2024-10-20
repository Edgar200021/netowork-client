import { z } from 'zod'

export const signUpSchema = z
  .object({
    role: z.enum(['freelancer', 'client'], {
      message: 'Недопустимое значение роли',
      required_error: 'Выберите роль',
      invalid_type_error: 'Недопустимое значение роли',
    }),
    first_name: z.string().min(1, 'Имя не может быть пустым'),
    last_name: z.string().min(1, 'Фамилия не может быть пустой'),
    email: z.string().email('Некорректная электронная почта'),
    password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
    password_confirm: z
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов'),
  })
  .refine(data => data.password_confirm === data.password, {
    message: 'Пароли не совпадают',
    path: ['password_confirm'],
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
