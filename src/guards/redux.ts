export const isRtkError = (
  error: unknown
): error is {
  data: unknown
  status: number | string
  originalStatus?: number
} => {
  const err = error as { data: unknown; status: string; originalStatus: number }
  return (
    err.status !== undefined &&
    err.data !== undefined &&
    (typeof err.originalStatus === 'number' || err.originalStatus === undefined) 
  )
}
