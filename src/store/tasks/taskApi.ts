import { TASK_FILES_NAME } from "@/constants/const";
import { baseApi } from "../baseApi";
import { RootState } from "../store";
import { taskSelectors } from "./taskSlice";
import {
	DeleteTaskFilesRequest,
	DeleteTaskFilesResponse,
	type CreateTaskRequest,
	type CreateTaskResponse,
	type GetAllTasksRequest,
	type GetAllTasksResponse,
	type GetMyTasksRequest,
	type GetMyTasksResponse,
	type UpdateTaskRequest,
	type UpdateTaskResponse,
} from "./types";

export const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllTasks: builder.query<GetAllTasksResponse, GetAllTasksRequest>({
			query: (body) => ({
				url: "/tasks",
				params: {
					...body,
				},
			}),
		}),

		getMyTasks: builder.query<GetMyTasksResponse, GetMyTasksRequest>({
			query: (body) => ({
				url: "/tasks/my-tasks",
				params: {
					...body,
				},
			}),
		}),

		createTask: builder.mutation<CreateTaskResponse, CreateTaskRequest>({
			query: (body) => {
				const formData = new FormData();

				for (const [key, value] of Object.entries(body)) {
					if (key === TASK_FILES_NAME && Array.isArray(value)) {
						for (const file of value) {
							formData.append(TASK_FILES_NAME, file);
						}

						continue;
					}

					formData.append(key, value as string);
				}

				return { url: "/tasks", method: "POST", body: formData };
			},
			onQueryStarted: async (arg, { getState, dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				const state = getState() as RootState;
				const queryArgs = taskSelectors.getMyTasksFilters({ task: state.task });

				dispatch(
					tasksApi.util.updateQueryData("getMyTasks", queryArgs, (draft) => {
						draft.data.push(data.data);
					}),
				);
			},
		}),

		updateTask: builder.mutation<UpdateTaskResponse, UpdateTaskRequest>({
			query: (body) => {
				const formData = new FormData();

				for (const [key, value] of Object.entries(body)) {
					if (key === TASK_FILES_NAME && Array.isArray(value)) {
						for (const file of value) {
							formData.append(TASK_FILES_NAME, file);
						}

						continue;
					}

					formData.append(key, value as string);
				}

				return {
					url: `/tasks/${body.taskId}`,
					method: "PATCH",
					body: formData,
				};
			},
			onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				const state = getState() as RootState;
				const queryArgs = taskSelectors.getMyTasksFilters({ task: state.task });

				dispatch(
					tasksApi.util.updateQueryData("getMyTasks", queryArgs, (draft) => {
						const index = draft.data.findIndex((t) => t.id === data.data.id);
						if (index === -1) {
							return;
						}

						draft.data[index] = {
							...draft.data[index],
							...data.data,
						};
					}),
				);
			},
		}),

		deleteTaskFiles: builder.mutation<
			DeleteTaskFilesResponse,
			DeleteTaskFilesRequest
		>({
			query: (body) => ({
				url: `/tasks/${body.taskId}/files`,
				method: "DELETE",
				body,
			}),
			onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				const state = getState() as RootState;
				const queryArgs = taskSelectors.getMyTasksFilters({ task: state.task });

				dispatch(
					tasksApi.util.updateQueryData("getMyTasks", queryArgs, (draft) => {
						const index = draft.data.findIndex((t) => t.id === arg.taskId);
						if (index === -1) {
							return;
						}

						draft.data[index] = {
							...draft.data[index],
							...data.data,
						};
					}),
				);
			},
		}),
	}),
});

export const {
	useGetAllTasksQuery,
	useGetMyTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskFilesMutation,
} = tasksApi;
