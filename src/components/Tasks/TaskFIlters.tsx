import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
} from "@/constants/const";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import { getMyTasksSchema } from "@/schemas/tasks/getMyTasksSchema";
import { getTasksByMyRepliesSchema } from "@/schemas/tasks/getTasksByMyRepliesSchema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors, taskSlice } from "@/store/tasks/taskSlice";
import type {
	GetAllTasksRequest,
	GetMyTasksRequest,
	GetTasksByMyRepliesRequest,
} from "@/store/tasks/types";
import { isTaskStatus } from "@/types/guards";
import type { TasksSort } from "@/types/task";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TaskFilters = <
	T extends Extract<
		keyof typeof taskSelectors,
		"getMyTasksFilters" | "getAllTasksFilters" | "getTasksByMyRepliesFilters"
	>,
>({
	selector,
}: { selector: T }) => {
	const {
		params: { limit, page, status, sort, subCategoryIds, search },
		setParams,
		deleteParams,
	} = useQueryParams<(keyof (GetAllTasksRequest & GetMyTasksRequest))[]>(
		"limit",
		"page",
		"status",
		"sort",
		"subCategoryIds",
		"search",
	);
	const dispatch = useAppDispatch();

	const filters = useAppSelector(taskSlice.selectors[selector]);

	const filtersFromQuery: GetAllTasksRequest &
		GetMyTasksRequest &
		GetTasksByMyRepliesRequest = {
		limit: Number(limit) || GET_TASKS_DEFAULT_LIMIT,
		page: Number(page) || GET_TASKS_DEFAULT_PAGE,
		...(isTaskStatus(status) && {
			status,
		}),
		...(search?.trim() && {
			search,
		}),
		...(sort?.trim() && { sort: sort.split(",") as TasksSort[] }),
		...(subCategoryIds?.trim() && {
			subCategoryIds: subCategoryIds.split(",").map(Number),
		}),
	};

	useEffect(() => {
		(async () => {
			const result = await (selector === "getAllTasksFilters"
				? getAllTasksSchema
				: selector === "getTasksByMyRepliesFilters"
					? getTasksByMyRepliesSchema
					: getMyTasksSchema
			).safeParseAsync(filtersFromQuery);

			if (!result.success) {
				for (const err of result.error.errors) {
					toast.error(err.message);
				}
				return;
			}

			const action =
				selector === "getAllTasksFilters"
					? taskActions.setAllTasksFilters
					: selector === "getTasksByMyRepliesFilters"
						? taskActions.setTasksByMyRepliesFilters
						: taskActions.setMyTasksFilters;
			dispatch(action(result.data));
		})();
	}, []);

	useEffect(() => {
		for (const [key, value] of Object.entries(filters)) {
			if (!value || (Array.isArray(value) && value.length === 0)) {
				deleteParams(
					key as keyof (GetAllTasksRequest &
						GetMyTasksRequest &
						GetTasksByMyRepliesRequest),
				);
				continue;
			}

			setParams(
				key as keyof (GetAllTasksRequest &
					GetMyTasksRequest &
					GetTasksByMyRepliesRequest),
				Array.isArray(value) ? value.join(",") : String(value),
			);
		}
	}, [filters]);

	return null;
};
