import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { UserRole, type User } from "@/types/user";
import { useState } from "react";
import { Link } from "react-router";
import defaultProfileIcon from "../assets/icons/default-profile.svg";
import { Logout } from "./Logout";
import { Button } from "./ui/button";
interface Props {
	className?: string;
	user: User;
}

export const UserProfile = ({ className, user }: Props) => {
	const [open, setOpen] = useState(false);

	const closePopover = () => setOpen(false);

	return (
		<div className={cn("", className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger>
					<Avatar>
						<AvatarImage src={user.avatar || defaultProfileIcon} />
						<AvatarFallback>{user.firstName}</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent align="start" alignOffset={-250} className="p-1.5">
					<Button
						onClick={closePopover}
						asChild
						variant="ghost"
						className="hover:no-underline rounded-xl py-2 px-3 w-full justify-start"
					>
						<Link className="no-underline" to={ROUTES.profile}>
							Профиль
						</Link>
					</Button>

					<Button
						onClick={closePopover}
						asChild
						variant="ghost"
						className="hover:no-underline rounded-xl py-2 px-3 w-full justify-start"
					>
						<Link
							className="no-underline"
							to={
								user.role === UserRole.Client ? ROUTES.myTasks : ROUTES.myOrders
							}
						>
							Мои заказы
						</Link>
					</Button>

					<Logout />
				</PopoverContent>
			</Popover>
		</div>
	);
};
