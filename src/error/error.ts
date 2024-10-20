export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export type ApiBaseError = {
  status: 'error'
  message: string
}

export type ApiValidationError<T = Record<string, string>> = {
  status: 'error'
  messages: T
}
