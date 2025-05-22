import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { useGetAllTasksQuery } from "@/store/tasks/taskApi";
import { taskSelectors } from "@/store/tasks/taskSlice";
import { Task } from './Task';
import { TaskPagination } from './TaskPagination';
import { useHandleError } from '@/hooks/useHandleError';

interface Props {
	className?: string;
}

export const TasksList = ({ className }: Props) => {
	const filters = useAppSelector(taskSelectors.getAllTasksFilters);
	const { data, error } = useGetAllTasksQuery(filters);

	useHandleError(error)
	
	return (
		<div className={cn("flex flex-col gap-y-20", className)}>
		<ul className='flex flex-col gap-y-32 w-full'>
			{data?.data.tasks.map((task) => (
				<li key={task.id} >
					<Task {...task}/>
				</li>
			))}
		</ul>
		<TaskPagination totalTasks={data?.data.totalCount || 0} type="all"/>
		</div>
	);
};
