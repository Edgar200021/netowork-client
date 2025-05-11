import { ROUTES } from "@/constants/routes.tsx";
import { cn, determineMonthsSpentOnSite } from "@/lib/utils.ts";
import { type User, UserRole } from "@/types/user.ts";
import { memo } from "react";
import { Link, Route } from "react-router";
import icon from "../../assets/icons/default-profile.svg";
import { Button } from "../ui/button.tsx";
import { UpdateAccountAvatar } from "@/components/MyAccount/UpdateAccountAvatar.tsx";

interface Props
	extends Pick<
		User,
		"avatar" | "firstName" | "lastName" | "createdAt" | "role"
	> {
	className?: string;
}

export const MyAccount = memo(
	({ className, avatar, firstName, lastName, createdAt, role }: Props) => {
		return (
			<div
				className={cn(
					"flex flex-col gap-y-6 max-w-[400px] mx-auto sm:max-w-full px-[10px] py-8 sm:p-8 rounded-2xl bg-white shadow-form ",
					className,
				)}
			>
				<div className="flex flex-col gap-y-4 items-center  sm:flex-row sm:gap-y-0 sm:gap-x-4">
					<div className="w-[120px] h-[120px] p-1 rounded-full bg-primary relative">
						<img
							className="w-full h-full object-cover rounded-full"
							src={avatar || icon}
							alt={firstName}
						/>
						<UpdateAccountAvatar className="absolute bottom-0 right-0" />
					</div>
					<div className="flex flex-col gap-y-1 md:gap-y-[10px] items-center sm:items-start">
						<span className="text-secondary-foreground text-sm">
							На сайте {determineMonthsSpentOnSite(createdAt)}
						</span>
						<span className="font-bold text-[22px] leading-[130%]">
							{firstName} {lastName}
						</span>
						<div className="flex items-center gap-x-2">
							<span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">
								&#10003;
							</span>
							<span className="leading-[130%]">Почта подтверждена</span>
						</div>
					</div>
				</div>
				<hr className="w-full hidden sm:block bg-border h-0.5" />
				<div className="sm:flex sm:items-center sm:gap-x-5 sm:justify-between ">
					<span className="hidden sm:inline-block text-lg sm:leading-[130%]">
						{role === UserRole.Freelancer
							? "Найди задание для выполнения заказа"
							: "Создать задание для выполнения заказа"}
					</span>
					<Button className="w-full sm:w-[164px]" asChild>
						<Link
							to={role === UserRole.Client ? ROUTES.createTask : ROUTES.main}
						>
							{role === UserRole.Freelancer
								? "Найти задание"
								: "Создать задание"}
						</Link>
					</Button>
				</div>
			</div>
		);
	},
);
