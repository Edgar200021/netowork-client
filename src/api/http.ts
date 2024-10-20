import { BASE_URL } from '@/const/http'
import { ROUTES } from '@/const/routing'
import { UnauthorizedError } from '@/error/error'
import axios from 'axios'

export const $http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  //  validateStatus: status => status < 500,
})

$http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      if (typeof window !== 'undefined') {
        return (window.location.href = ROUTES.login)
      }
      throw new UnauthorizedError('Unauthorized')
    }

    //return error
    return Promise.reject(error)
  }
)
