import { SignUpSchema } from '@/schemas/auth/signUpSchema'
import { $http } from '../http'

export const signUp = async (data: SignUpSchema) => {
  try {
    await $http.post('/auth/sign-up', data)
  } catch (error) {
    throw error
  }
}
