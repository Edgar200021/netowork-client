import { SignInForm } from '@/components/forms/SignInForm'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <SignInForm />
    </main>
  )
}
