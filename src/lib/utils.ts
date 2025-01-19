import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const determineMonthsSpentOnSite = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date()
  }

  if (date.toString() === 'Invalid Date') throw new Error('Invalid date')

  const now = new Date()

  const months = Math.abs(
    date.getMonth() +
      12 * date.getFullYear() -
      (now.getMonth() + 12 * now.getFullYear())
  )

  return months === 0
    ? 'меньше месяца'
    : months === 1
    ? '1 месяц'
    : `${months} месяцев`
}
