import { RegisterForm } from '@/components/forms/RegisterForm'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const RegisterPage = ({ className }: Props) => {
  return (
    <main className={cn(className)}>
      <RegisterForm />
    </main>
  )
}
