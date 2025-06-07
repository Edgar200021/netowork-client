import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { TaskStatus, type Task } from "@/types/task";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";

interface Props {
	className?: string;
	mainLabel?: string;
	selector: Extract<
		keyof typeof taskSelectors,
		"getMyTasksFiltersStatus" | "getTasksByMyRepliesFiltersStatus"
	>;
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

export const TaskStatuses = ({ className, mainLabel, selector }: Props) => {
	const status = useAppSelector(taskSelectors[selector]);
	const dispatch = useAppDispatch();
	return (
		<div
			className={cn(
				"flex items-center gap-x-6 overflow-x-auto w-[500px] scroll-smooth mb-10",
				className,
			)}
		>
			{statusFilters.map(({ label, status: s }, i) => (
				<Button
					key={label}
					className="px-0 py-0 pb-4 relative"
					onClick={() => {
						dispatch(
							taskActions[
								selector === "getMyTasksFiltersStatus"
									? "setMyTasksFilters"
									: "setTasksByMyRepliesFilters"
							]({
								status: s,
							}),
						);
					}}
					variant="ghost"
				>
					<span className="text-lg">
						{i === 0 ? mainLabel || label : label}
					</span>
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
