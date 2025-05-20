import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useGetAllTasksQuery } from "@/store/tasks/taskApi";
import { taskSelectors } from "@/store/tasks/taskSlice";

interface Props {
	className?: string;
}

export const TasksList = ({ className }: Props) => {
	const filters = useAppSelector(taskSelectors.getAllTasksFilters);
	const { data } = useGetAllTasksQuery(filters);

	return (
		<ul className={cn("flex flex-col gap-y-5", className)}>
			{Array.from({ length: 100 }).map((_, index) => (
				<li key={index}>Task</li>
			))}
		</ul>
	);
};
