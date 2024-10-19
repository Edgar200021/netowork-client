import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'flex items-center transition-colors duration-300 ease-in',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-200 active:bg-primary-300 hover:bg-primary-100 disabled:text-text-secondary disabled:border-[1px] disabled:border-[#ebebeb] text-white',
      },
      size: {
        sm: 'text-sm leading-[143%] rounded-lg py-[6px] px-3',
        md: 'text-base leading-[137%] rounded-xl py-[9px] px-4',
        lg: 'text-lg leading-[133%] rounded-xl py-3 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={href}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
