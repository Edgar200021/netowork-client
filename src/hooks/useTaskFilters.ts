import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
} from "@/constants/const";
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
import { getAllTasksSchema } from "../schemas/tasks/getAllTasksSchema";
import { useQueryParams } from "./useQueryParams";

export const useTaskFilters = <
	T extends Extract<
		keyof typeof taskSlice.selectors,
		"getMyTasksFilters" | "getAllTasksFilters"
	>,
>(
	selector: T,
) => {
	const {
		params: { limit, page, status, sort, subCategoryIds },
		setParams,
		deleteParams,
	} = useQueryParams<(keyof (GetAllTasksRequest & GetMyTasksRequest))[]>(
		"limit",
		"page",
		"status",
		"sort",
		"subCategoryIds",
	);
	const dispatch = useAppDispatch();

	const filters = useAppSelector(taskSlice.selectors[selector]);

	const filtersFromQuery: GetAllTasksRequest & GetMyTasksRequest = {
		limit: Number(limit) || GET_TASKS_DEFAULT_LIMIT,
		page: Number(page) || GET_TASKS_DEFAULT_PAGE,
		...(isTaskStatus(status) && {
			status,
		}),
		...(sort && { sort: sort.split(",") as TasksSort[] }),
		...(subCategoryIds && {
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
			if (!value) {
				deleteParams(key as keyof (GetAllTasksRequest & GetMyTasksRequest));
				continue;
			}

			setParams(
				key as keyof (GetAllTasksRequest & GetMyTasksRequest),
				Array.isArray(value) ? value.join(",") : String(value),
			);
		}
	}, [filters]);
};
