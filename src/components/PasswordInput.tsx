import { cn } from '@/lib/utils'
import {
  ComponentProps,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from 'react'
import zxcvbn from 'zxcvbn'
import closeIcon from '../assets/icons/eye-close.svg'
import openIcon from '../assets/icons/eye-open.svg'
import { Button } from './ui/button'
import { Input } from './ui/input'
interface Props {
  className?: string
  inputProps?: ComponentProps<'input'>
  label?: string
  children?: ReactNode
  calculateStrength?: boolean
}

export const PasswordInput = ({
  className,
  inputProps,
  label = 'Пароль',
  children,
  calculateStrength = true,
}: Props) => {
  const [password, setPassword] = useState('')
  const [type, setType] =
    useState<Extract<HTMLInputTypeAttribute, 'password' | 'text'>>('password')

  const testResult = zxcvbn(password),
    percentage = (testResult.score * 100) / 4

  return (
    <label className={cn('flex flex-col gap-y-2', className)}>
      <span className="leading-[140%] text-secondary-foreground">{label}</span>
      <div className="relative">
        <Input
          value={inputProps?.value || password}
          {...inputProps}
          type={type}
          onChange={e => {
            //@ts-expect-error ...
            inputProps?.onChange(e)

            if (calculateStrength) {
              setPassword(e.target.value)
            }
          }}
          className="pr-10"
        />
        <Button
          type="button"
          onClick={() =>
            setType(prev => (prev === 'password' ? 'text' : 'password'))
          }
          className="p-0 absolute right-3 top-[50%] -translate-y-[50%]"
          variant={'link'}
        >
          <img
            width={20}
            height={20}
            src={type === 'password' ? openIcon : closeIcon}
          />
        </Button>
      </div>

      {calculateStrength && (
        <>
          <div className="bg-gray-300 w-[99%] h-1">
            <div
              className={cn('w-full h-full', {
                'bg-red-600': testResult.score === 1,
                'bg-yellow-600': testResult.score === 2,
                'bg-green-400': testResult.score === 3,
                'bg-green-600': testResult.score === 4,
              })}
              style={{
                width: `${percentage}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-secondary-foreground leading-[143%">
            Пароль должен содержать не менее 8 символов, латиницу, цифры, один
            из символов (!$#%)
          </p>
        </>
      )}
      {children}
    </label>
  )
}
