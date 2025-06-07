import { MyAccount } from "@/components/MyAccount/MyAccount.tsx";
import { TaskFilters } from "@/components/Tasks/TaskFIlters";
import { TasksListByMyReplies } from "@/components/Tasks/TasksListByMyReplies";
import { TaskStatuses } from "@/components/Tasks/TaskStatuses";
import { Loader } from "@/components/ui/loader";
import { ROUTES } from "@/constants/routes";
import { useGetTasksByMyReplies } from "@/hooks/useGetTasksByMyReplies";
import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { UserRole } from "@/types/user";
import { NavLink, Navigate, useOutlet } from "react-router";

interface Props {
	className?: string;
}

export const MyAccountLayout = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);
	const outlet = useOutlet();
	const { data, isLoading, isFetching, error } = useGetTasksByMyReplies(
		user?.role === UserRole.Client,
	);

	if (!user) return <Navigate to={ROUTES.login} />;

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
					user.role === UserRole.Freelancer && data?.data.tasks.length
						? "Вы можете найти еще заказы"
						: undefined
				}
			/>
			{outlet && (
				<>
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
					{outlet}
				</>
			)}

			{!outlet && user.role === UserRole.Freelancer && (
				<div className="max-sm:box">
					{isLoading && (
						<div className="flex items-center justify-center mt-20">
							<Loader size="lg" />
						</div>
					)}
					{!error && !isLoading && data && (
						<>
							<TaskFilters selector="getTasksByMyRepliesFilters" />
							<TaskStatuses
								mainLabel="Все отклики"
								selector="getTasksByMyRepliesFiltersStatus"
							/>
							<TasksListByMyReplies
								className={isFetching ? "opacity-50" : ""}
								data={data}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
};
