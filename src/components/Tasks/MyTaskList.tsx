import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
} from "@/constants/const";
import { useHandleError } from "@/hooks/useHandleError";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import { useGetMyTasksQuery } from "@/store/tasks/taskApi";
import { isTaskStatus } from "@/types/guards";
import { Task } from "@/types/task";
import { Button } from "../ui/button";
import { Loader } from "../ui/loader";
import { MyTask } from "./MyTask/MyTask";

interface Props {
	className?: string;
}

const statusFilters: { label: string; status?: Task["status"] }[] = [
	{
		label: "Все заказы",
	},
	{
		label: "Согласование условий",
		status: "open",
	},
	{
		label: "В работе",
		status: "in_progress",
	},
	{
		label: "Закрытые",
		status: "completed",
	},
];

export const MyTaskList = ({ className }: Props) => {
	const {
		params: { limit, page, status },
		setParams,
		deleteParams,
	} = useQueryParams("limit", "page", "status");
	const { data, isLoading, error } = useGetMyTasksQuery({
		limit: Number(limit) || GET_TASKS_DEFAULT_LIMIT,
		page: Number(page) || GET_TASKS_DEFAULT_PAGE,
		...(isTaskStatus(status) && {
			status,
		}),
	});

	useHandleError(error);

	if (isLoading) return <Loader size="lg" />;
	if (error || !data) return null;

	return (
		<div className={cn(className, "")}>
			<div className="flex items-center gap-x-6 overflow-x-auto w-[500px] scroll-smooth mb-10">
				{statusFilters.map(({ label, status: s }) => (
					<Button
						key={label}
						className="px-0 py-0 pb-4 relative"
						onClick={() => {
							if (!s) {
								return deleteParams("status");
							}
							if (s) {
								setParams("status", s);
							}
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
						>
							axxxx
						</span>
					</Button>
				))}
			</div>

			<ul className={"flex flex-col gap-y-[50px]"}>
				{data.data.map((task) => (
					<li key={task.id}>
						<MyTask {...task} />
					</li>
				))}
			</ul>
		</div>
	);
};
