import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TaskStatus, type Task } from "@/types/task";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";

interface Props {
	className?: string;
}

const statusFilters: { label: string; status?: Task["status"] }[] = [
	{
		label: "Все заказы",
	},
	{
		label: "Согласование условий",
		status: TaskStatus.Open,
	},
	{
		label: "В работе",
		status: TaskStatus.InProgress,
	},
	{
		label: "Закрытые",
		status: TaskStatus.Completed,
	},
];

export const TaskStatuses = ({ className }: Props) => {
	const status = useAppSelector(taskSelectors.getMyTasksFiltersStatus);
	const dispatch = useAppDispatch();
	return (
		<div
			className={cn(
				"flex items-center gap-x-6 overflow-x-auto w-[500px] scroll-smooth mb-10",
				className,
			)}
		>
			{statusFilters.map(({ label, status: s }) => (
				<Button
					key={label}
					className="px-0 py-0 pb-4 relative"
					onClick={() => {
						dispatch(
							taskActions.setMyTasksFilters({
								status: s,
							}),
						);
					}}
					variant="ghost"
				>
					<span className="text-lg">{label}</span>
					<span
						className={cn(
							"absolute bottom-0 left-0 bg-primary opacity-0 transition-opacity duration-300 ease h-[2px] block w-full",
							{
								"opacity-100": status === s,
							},
						)}
					/>
				</Button>
			))}
		</div>
	);
};
