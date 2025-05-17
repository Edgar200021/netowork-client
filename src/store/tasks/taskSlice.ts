import {
	GET_TASKS_DEFAULT_LIMIT,
	GET_TASKS_DEFAULT_PAGE,
} from "@/constants/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMyTasksRequest } from "./types";

type State = {
	getMyTasksFilters: GetMyTasksRequest;
};
const initialState: State = {
	getMyTasksFilters: {
		limit: GET_TASKS_DEFAULT_LIMIT,
		page: GET_TASKS_DEFAULT_PAGE,
	},
};

export const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		setMyTasksFilters: (state, action: PayloadAction<GetMyTasksRequest>) => {
			state.getMyTasksFilters = action.payload;
		},
	},
	selectors: {
		getMyTasksFilters: (state) => state.getMyTasksFilters,
	},
});

export const { actions: taskActions, selectors: taskSelectors } = taskSlice;
