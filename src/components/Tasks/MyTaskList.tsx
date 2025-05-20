import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { authSelectors } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { useGetMyTasksQuery } from "@/store/tasks/taskApi";
import { taskSelectors } from "@/store/tasks/taskSlice";

import { Loader } from "../ui/loader";
import { MyTask } from "./MyTask/MyTask";
import { TaskFilters } from "./TaskFIlters";
import { TaskStatuses } from "./TaskStatuses";

interface Props {
	className?: string;
}

export const MyTaskList = ({ className }: Props) => {
	const filters = useAppSelector(taskSelectors.getMyTasksFilters);
	const { data, isLoading, error } = useGetMyTasksQuery(filters);

	const me = useAppSelector(authSelectors.getUser);

	useHandleError(error);

	if (isLoading) return <Loader size="lg" />;
	if (error || !data || !me) return null;

	return (
		<div className={cn(className, "")}>
			<TaskFilters selector="getMyTasksFilters" />
			<TaskStatuses />

			<ul className={"flex flex-col gap-y-[50px]"}>
				{data.data.map((task) => (
					<li key={task.id}>
						<MyTask {...task} userEmail={me.email} />
					</li>
				))}
			</ul>
		</div>
	);
};
