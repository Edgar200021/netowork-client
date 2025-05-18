import { MyAccount } from "@/components/MyAccount/MyAccount.tsx";
import { ROUTES } from "@/constants/routes";
import { useGetMyOrders } from "@/hooks/useGetMyOrders";
import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { UserRole } from "@/types/user";
import { NavLink, Navigate, Outlet, useOutlet } from "react-router";

interface Props {
	className?: string;
}

export const MyAccountLayout = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);
	const outlet = useOutlet();
	const { data } = useGetMyOrders(user?.role === UserRole.Client);

	if (!user) return <Navigate to={ROUTES.login} />;

	console.log("DATA", data);

	return (
		<div className={cn("sm:box", className)}>
			<MyAccount
				createdAt={user.createdAt}
				firstName={user.firstName}
				lastName={user.lastName}
				avatar={user.avatar}
				role={user.role}
				className="mb-[50px] sm:-mt-10"
				freelancerTitle={
					user.role === UserRole.Freelancer && data?.length
						? "Вы можете найти еще заказы"
						: ""
				}
			/>
			{outlet && (
				<div className="flex items-center gap-x-6 max-sm:box">
					<NavLink
						className="text-lg leading-[133%] pb-3 aria-[current=page]:border-b-2 aria-[current=page]:border-b-primary"
						end={true}
						to={ROUTES.profile}
					>
						Обо мне
					</NavLink>
					<NavLink
						className="text-lg leading-[133%] pb-3 aria-[current=page]:border-b-2 aria-[current=page]:border-b-primary"
						to={ROUTES.profileSettings}
					>
						Настройки
					</NavLink>
				</div>
			)}
			{
				//TODO
			}
			{!outlet && user.role === UserRole.Freelancer && "Place for my-orders list"}
		</div>
	);
};
