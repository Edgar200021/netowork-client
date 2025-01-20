import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Некорректный эл. адрес'),
  password: z.string().min(8, 'Минимальная длина пароля 8 символов'),
})

export type LoginSchema = z.infer<typeof loginSchema>
