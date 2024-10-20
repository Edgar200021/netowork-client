'use client'

import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import zxcvbn from 'zxcvbn'
import { Button } from './button'
import { Input, InputProps } from './input'

interface Props extends Omit<InputProps, 'type'> {
  children?: ReactNode
}

export const PasswordInput = ({ children, className, ...props }: Props) => {
  const [type, setType] = useState<'password' | 'text'>('password')
  const [password, setPassword] = useState('password')

  const strongPassword = zxcvbn(password)

  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <label className={cn('flex flex-col gap-y-2 ')}>
        <span className="text-text-secondary capitalize leading-[140%]">
          Пароль
        </span>
        <div>
          <Input
            onChange={e => {
              setPassword(e.target.value)
            }}
            {...props}
            type={type}
          />
          <Button variant="clear">
            {/*<svg>
              <use xlinkHref={`${sprites}#eye`} />
            </svg>*/}
          </Button>
        </div>
      </label>
      <div className="bg-border-primary h-1 relative ">
        <div
          className="h-full w-full absolute left-0 top-0 transition-all duration-500 ease"
          style={{
            width: `${Math.round((strongPassword.score * 100) / 4)}%`,
            background:
              strongPassword.score === 1
                ? '#ed0a34'
                : strongPassword.score === 2
                ? '#ffd400'
                : strongPassword.score === 3
                ? '#9bc128'
                : strongPassword.score === 4
                ? '#00b500'
                : '#none',
          }}
        ></div>
      </div>
      <p className="text-text-secondary text-sm">
        Пароль должен содержать не менее 8 символов, латиницу, цифры, один из
        символов (!$#%)
      </p>
	  {children}
    </div>
  )
}
