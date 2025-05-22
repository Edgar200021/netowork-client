import { GET_ALL_TASKS_MAX_LIMIT } from "@/constants/const";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";
import { Pagination } from "../Pagination";

interface Props {
	className?: string;
	type: "my" | "all";
	totalTasks: number;
}

export const TaskPagination = ({ className, type, totalTasks }: Props) => {
	const currentPage =
		useAppSelector(
			type === "my"
				? taskSelectors.getMyTasksFiltersPage
				: taskSelectors.getAllTasksFiltersPage,
		) || 1;
	const limit =
		useAppSelector(
			type === "my"
				? taskSelectors.getMyTasksFiltersLimit
				: taskSelectors.getAllTasksFiltersLimit,
		) || GET_ALL_TASKS_MAX_LIMIT;
	const dispatch = useAppDispatch();

	return (
		<Pagination
			onSetPage={(page) =>
				dispatch(
					type === "my"
						? taskActions.setMyTasksFiltersPage(page)
						: taskActions.setAllTasksFiltersPage(page),
				)
			}
			className={className}
			totalPages={Math.ceil(totalTasks / limit)}
			currentPage={currentPage}
		/>
	);
};
