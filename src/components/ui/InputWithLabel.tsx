import { cn } from '@/lib/utils'
import { Input, InputProps } from './input'
import { ReactNode } from 'react'

export interface Props extends InputProps {
  label: string
  children?: ReactNode
}

export const InputWithLabel = ({ children, className, label, ...props }: Props) => {
  return (
    <label className={cn('flex flex-col gap-y-2 ', className)}>
      <span className="text-text-secondary capitalize leading-[140%]">{label}</span>
      <Input {...props} />
	  {children}
    </label>
  )
}
