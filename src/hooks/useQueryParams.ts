import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export const useQueryParams = <T extends string[]>(
  ...keys: T
): {
  params: Partial<Record<T[number], string>>
  setParams: (key: T[number], value: string) => void
} => {
  const [params, setParams] = useSearchParams()
  const map = new Map()

  keys.forEach(key => {
    const value = params.get(key)

    if (!value) return

    map.set(key, value)
  })

  const setQueryParams = useCallback((key: T[number], value: string) => {
    params.set(key, value)
    setParams(params)
  }, [])

  return {
    params: Object.fromEntries(map) as Partial<Record<T[number], string>>,
    setParams: setQueryParams,
  }
}
