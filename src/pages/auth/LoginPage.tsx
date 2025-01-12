import { LoginForm } from '@/components/forms/LoginForm'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const LoginPage = ({ className }: Props) => {
  return (
    <main className={cn(className)}>
      <LoginForm />
    </main>
  )
}
