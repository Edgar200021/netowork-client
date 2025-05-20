import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
	SORT_ORDER_SEPARATOR,
} from "@/constants/const";
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TasksSort } from "../../types/task";
import type { GetAllTasksRequest, GetMyTasksRequest } from "./types";

type State = {
	getMyTasksFilters: GetMyTasksRequest;
	getAllTasksFilters: GetAllTasksRequest;
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
		setAllTasksFilters: (state, action: PayloadAction<GetAllTasksRequest>) => {
			state.getAllTasksFilters = {
				...state.getAllTasksFilters,
				...action.payload,
			};
		},
		setAllTasksFiltersSubCategoryIds: (state, action: PayloadAction<number>) => {
			if (!state.getAllTasksFilters.subCategoryIds) {
				state.getAllTasksFilters.subCategoryIds = [action.payload];
				return 
			}

			if (state.getAllTasksFilters.subCategoryIds.includes(action.payload)) {
				state.getAllTasksFilters.subCategoryIds = state.getAllTasksFilters.subCategoryIds.filter(
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
	},
	selectors: {
		getMyTasksFilters: (state) => state.getMyTasksFilters,
		getMyTasksFiltersStatus: (state) => state.getMyTasksFilters.status,

		getAllTasksFilters: (state) => state.getAllTasksFilters,
		getAllTasksFiltersSearch: (state) => state.getAllTasksFilters.search,
		getAllTasksFiltersSort: (state) => state.getAllTasksFilters.sort,
		getAllTasksFiltersSubCategoryIds: (state) =>
			state.getAllTasksFilters.subCategoryIds,
	},
});

export const { actions: taskActions, selectors: taskSelectors } = taskSlice;
