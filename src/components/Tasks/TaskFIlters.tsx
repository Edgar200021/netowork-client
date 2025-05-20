import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
} from "@/constants/const";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import { getMyTasksSchema } from "@/schemas/tasks/getMyTasksSchema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskSlice } from "@/store/tasks/taskSlice";
import type {
	GetAllTasksRequest,
	GetMyTasksRequest,
} from "@/store/tasks/types";
import { isTaskStatus } from "@/types/guards";
import type { TasksSort } from "@/types/task";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TaskFilters = <
	T extends Extract<
		keyof typeof taskSlice.selectors,
		"getMyTasksFilters" | "getAllTasksFilters"
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

	const filtersFromQuery: GetAllTasksRequest & GetMyTasksRequest = {
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
					? taskSlice.actions.setAllTasksFilters
					: taskSlice.actions.setMyTasksFilters;
			dispatch(action(result.data));
		})();
	}, []);

	useEffect(() => {
		for (const [key, value] of Object.entries(filters)) {
			if (!value || (Array.isArray(value) && value.length === 0)) {
				deleteParams(key as keyof (GetAllTasksRequest & GetMyTasksRequest));
				continue;
			}

			setParams(
				key as keyof (GetAllTasksRequest & GetMyTasksRequest),
				Array.isArray(value) ? value.join(",") : String(value),
			);
		}
	}, [filters]);

	return null;
};
