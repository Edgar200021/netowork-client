import { cn } from '@/lib/utils'
import { authSlice } from '@/store/auth/authSlice'
import { useAppSelector } from '@/store/store'
import { Navigate } from 'react-router'
import { ROUTES } from '../../constants/routes'
import { ChangePasswordForm } from '../forms/ChangePasswordForm'
import { PersonalDataSettingsForm } from '../forms/PersonalDataSettingsForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

interface Props {
  className?: string
}

export const AccountSettings = ({ className }: Props) => {
  const user = useAppSelector(authSlice.selectors.getUser)

  if (!user) return <Navigate to={ROUTES.login} />

  return (
    <div
      className={cn(
        'rounded-2xl rounded-t-none shadow-form py-8 px-4 sm:p-4 bg-white',
        className
      )}
    >
      <Tabs defaultValue="general" className={cn('w-full', className)}>
        <TabsList className="border-[1px] rounded-sm max-w-fit bg-transparent justify-start w-full divide-x-[1px] mb-6 sm:mb-8 overflow-hidden p-0">
          <TabsTrigger
            className="px-3 py-2 data-[state=active]:bg-primary/90 data-[state=active]:text-white !rounded-none !shadow-none"
            value="general"
          >
            Общие настройки
          </TabsTrigger>
          <TabsTrigger
            className="px-3 py-2 data-[state=active]:bg-primary/90 data-[state=active]:text-white !rounded-none !shadow-none"
            value="notifications"
          >
            Уведомления
          </TabsTrigger>
          <TabsTrigger
            className="px-3 py-2 data-[state=active]:bg-primary/90 data-[state=active]:text-white !rounded-none !shadow-none"
            value="security"
          >
            Безопасность
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <PersonalDataSettingsForm
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        </TabsContent>
        <TabsContent value="notifications">
          Change your password here.
        </TabsContent>
        <TabsContent value="security">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
