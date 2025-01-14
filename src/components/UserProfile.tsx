import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { User } from '@/types/user'
import { Link } from 'react-router'
import defaultProfileIcon from '../assets/icons/default-profile.svg'
import { Logout } from './Logout'
import { Button } from './ui/button'
interface Props {
  className?: string
  user: User
}

export const UserProfile = ({ className, user }: Props) => {
  return (
    <div className={cn('', className)}>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={user.avatar || defaultProfileIcon} />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="start" alignOffset={-250} className="p-1.5">
          <Button
            asChild
            variant="ghost"
            className="hover:no-underline rounded-xl py-2 px-3 w-full justify-start"
          >
            <Link className="no-underline" to={ROUTES.profile}>
              Профиль
            </Link>
          </Button>
          <Logout />
        </PopoverContent>
      </Popover>
    </div>
  )
}
