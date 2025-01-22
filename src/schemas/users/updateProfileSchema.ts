import { z } from 'zod'

export const updateProfileSchema = z.object({
  firstName: z.string().nonempty('Обязательное поле'),
  lastName: z.string().nonempty('Обязательное поле'),
  email: z.string().email('Некорректный эл. адрес'),
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
