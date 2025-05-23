import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useGetAllTasksQuery } from "@/store/tasks/taskApi";
import { taskSelectors } from "@/store/tasks/taskSlice";
import { Loader } from "../ui/loader";
import { Task } from "./Task";
import { TaskPagination } from "./TaskPagination";

interface Props {
	className?: string;
	loaderClassName?: string;
}

export const TasksList = ({ className, loaderClassName }: Props) => {
	const filters = useAppSelector(taskSelectors.getAllTasksFilters);
	const { data, error, isLoading, isFetching } = useGetAllTasksQuery(filters);

	useHandleError(error);

	if (isLoading) return <Loader className={loaderClassName} size="lg" />;
	if (!data || error) return null;

	return (
		<div className={cn("flex flex-col gap-y-20", className)}>
			{Object.entries(filters).filter(
				([key]) => key !== "limit" || key !== "page",
			).length > 0 &&
				data.data.tasks.length === 0 && (
					<p className="text-3xl font-bold text-center">Задания по заданным фильтрам не найдены</p>
				)}

			<ul
				className={cn("flex flex-col gap-y-32 w-full", {
					"opacity-50": isFetching,
				})}
			>
				{data?.data.tasks.map((task) => (
					<li key={task.id}>
						<Task task={task} />
					</li>
				))}
			</ul>
			<TaskPagination totalTasks={data?.data.totalCount || 0} type="all" />
		</div>
	);
};
