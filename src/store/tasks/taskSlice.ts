import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
	SORT_ORDER_SEPARATOR,
} from "@/constants/const";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Task, TasksSort } from "../../types/task";
import type { GetAllTasksRequest, GetMyTasksRequest } from "./types";
import { GetTasksByMyRepliesSchema } from "../../schemas/tasks/getTasksByMyRepliesSchema";

type State = {
	getMyTasksFilters: GetMyTasksRequest;
	getAllTasksFilters: GetAllTasksRequest;
	getTasksByMyRepliesFilters: GetTasksByMyRepliesSchema;

	specificTask?: Task;
};
const initialState: State = {
	getMyTasksFilters: {
		limit: GET_TASKS_DEFAULT_LIMIT,
		page: GET_TASKS_DEFAULT_PAGE,
	},
	getAllTasksFilters: {
		limit: GET_TASKS_DEFAULT_LIMIT,
		page: GET_TASKS_DEFAULT_PAGE,
	},
	getTasksByMyRepliesFilters: {
		limit: GET_TASKS_DEFAULT_LIMIT,
		page: GET_TASKS_DEFAULT_PAGE,
	},
	specificTask: undefined,
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setMyTasksFilters: (state, action: PayloadAction<GetMyTasksRequest>) => {
			state.getMyTasksFilters = {
				...state.getMyTasksFilters,
				...action.payload,
			};
		},
		setMyTasksFiltersPage: (state, action: PayloadAction<number>) => {
			state.getMyTasksFilters.page = action.payload;
		},

		setAllTasksFilters: (state, action: PayloadAction<GetAllTasksRequest>) => {
			state.getAllTasksFilters = {
				...state.getAllTasksFilters,
				...action.payload,
			};
		},
		setAllTasksFiltersPage: (state, action: PayloadAction<number>) => {
			state.getAllTasksFilters.page = action.payload;
		},
		setAllTasksFiltersSubCategoryIds: (
			state,
			action: PayloadAction<number>,
		) => {
			if (!state.getAllTasksFilters.subCategoryIds) {
				state.getAllTasksFilters.subCategoryIds = [action.payload];
				return;
			}

			if (state.getAllTasksFilters.subCategoryIds.includes(action.payload)) {
				state.getAllTasksFilters.subCategoryIds =
					state.getAllTasksFilters.subCategoryIds.filter(
						(val) => val !== action.payload,
					);

				return;
			}
			state.getAllTasksFilters.subCategoryIds.push(action.payload);
		},
		setAllTasksFiltersSort: (state, action: PayloadAction<TasksSort>) => {
			if (!state.getAllTasksFilters.sort) {
				state.getAllTasksFilters.sort = [action.payload];
				return;
			}

			if (state.getAllTasksFilters.sort.includes(action.payload)) {
				state.getAllTasksFilters.sort = state.getAllTasksFilters.sort.filter(
					(val) => val !== action.payload,
				);
				return;
			}

			const [key] = action.payload.split(SORT_ORDER_SEPARATOR);

			const index = state.getAllTasksFilters.sort.findIndex(
				(val) => val.split(SORT_ORDER_SEPARATOR)[0] === key,
			);

			if (index !== -1) {
				state.getAllTasksFilters.sort[index] = action.payload;
				return;
			}

			state.getAllTasksFilters.sort.push(action.payload);
		},

		setTasksByMyRepliesFilters: (
			state,
			action: PayloadAction<GetTasksByMyRepliesSchema>,
		) => {
			state.getTasksByMyRepliesFilters = {
				...state.getTasksByMyRepliesFilters,
				...action.payload,
			};
		},
		setTasksByMyRepliesFiltersPage: (state, action: PayloadAction<number>) => {
			state.getTasksByMyRepliesFilters.page = action.payload;
		},

		setSpecificTask: (state, action: PayloadAction<Task>) => {
			state.specificTask = action.payload;
		},
	},
	selectors: {
		getMyTasksFilters: (state) => state.getMyTasksFilters,
		getMyTasksFiltersStatus: (state) => state.getMyTasksFilters.status,
		getMyTasksFiltersPage: (state) => state.getMyTasksFilters.page,
		getMyTasksFiltersLimit: (state) => state.getMyTasksFilters.limit,

		getAllTasksFilters: (state) => state.getAllTasksFilters,
		getAllTasksFiltersSearch: (state) => state.getAllTasksFilters.search,
		getAllTasksFiltersSort: (state) => state.getAllTasksFilters.sort,
		getAllTasksFiltersSubCategoryIds: (state) =>
			state.getAllTasksFilters.subCategoryIds,
		getAllTasksFiltersPage: (state) => state.getAllTasksFilters.page,
		getAllTasksFiltersLimit: (state) => state.getAllTasksFilters.limit,

		getTasksByMyRepliesFilters: (state) => state.getTasksByMyRepliesFilters,
		getTasksByMyRepliesFiltersStatus: (state) =>
			state.getTasksByMyRepliesFilters.status,
		getTasksByMyRepliesFiltersPage: (state) =>
			state.getTasksByMyRepliesFilters.page,
		getTasksByMyRepliesFiltersLimit: (state) =>
			state.getTasksByMyRepliesFilters.limit,

		getSpecificTask: (state) => state.specificTask,
	},
});

export const { actions: taskActions, selectors: taskSelectors } = taskSlice;
