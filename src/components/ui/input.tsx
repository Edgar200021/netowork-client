import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const inputVariants = cva('bg-transparent ', {
  variants: {
    variant: {
      primary:
        'bg-white disabled:bg-[#f6f6f6] border-border-primary required:invalid:border-border-primary placeholder:text-text-secondary rounded-md invalid:border-[2px] invalid:border-error focus:border-[2px] focus:border-primary-200 outline-none disabled:text-text-secondary hover:border-[rgba(0,0,0,0.32)] transition-colors duration-200 ease md:text-[18px]',
    },
    dimensions: {
      sm: 'py-[9px] border-[1px] px-3 leading-[137%] md:py-3 md:px-4 w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    dimensions: 'sm',
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, dimensions, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, dimensions, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }
