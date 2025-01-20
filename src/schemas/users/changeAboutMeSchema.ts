import { z } from 'zod'

export const changeAboutMeSchema = z.object({
  aboutMe: z.string().nonempty('Обязательное поле').max(2000),
})

export type ChangeAboutMe = z.infer<typeof changeAboutMeSchema>
