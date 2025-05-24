import { TASK_FILES_NAME } from "@/constants/const";
import { baseApi } from "../baseApi";
import type { RootState } from "../store";
import { taskSelectors } from "./taskSlice";
import type {
	CreateTaskRequest,
	CreateTaskResponse,
	DeleteTaskFilesRequest,
	DeleteTaskFilesResponse,
	DeleteTaskRequest,
	DeleteTaskResponse,
	GetAllTasksRequest,
	GetAllTasksResponse,
	GetMyTasksRequest,
	GetMyTasksResponse,
	GetTaskRequest,
	GetTaskResponse,
	UpdateTaskRequest,
	UpdateTaskResponse,
} from "./types";

export const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllTasks: builder.query<GetAllTasksResponse, GetAllTasksRequest>({
			query: (body) => {
				return {
					url: "/tasks",
					params: {
						limit: body.limit,
						page: body.page,

						...(body.subCategoryIds &&
							body.subCategoryIds.length > 0 && {
								subCategoryIds: body.subCategoryIds.join(","),
							}),
						...(body.sort &&
							body.sort.length > 0 && {
								sort: body.sort.join(","),
							}),
						...(body.search?.trim() && {
							search: body.search,
						}),
					},
				};
			},
		}),

		getMyTasks: builder.query<GetMyTasksResponse, GetMyTasksRequest>({
			query: (body) => ({
				url: "/tasks/my-tasks",
				params: {
					...body,
				},
			}),
		}),

		getTask: builder.query<GetTaskResponse, GetTaskRequest>({
			query: (body) => ({
				url: `/tasks/${body.taskId}`,
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
						draft.data.tasks.unshift(data.data);
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
						const index = draft.data.tasks.findIndex(
							(t) => t.id === data.data.id,
						);
						if (index === -1) {
							return;
						}

						draft.data.tasks[index] = {
							...draft.data.tasks[index],
							...data.data,
						};
					}),
				);
			},
		}),

		deleteTask: builder.mutation<DeleteTaskResponse, DeleteTaskRequest>({
			query: (body) => ({
				url: `/tasks/${body.taskId}`,
				method: "DELETE",
			}),

			onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
				await queryFulfilled;

				const state = getState() as RootState;
				const queryArgs = taskSelectors.getMyTasksFilters({ task: state.task });

				dispatch(
					tasksApi.util.updateQueryData("getMyTasks", queryArgs, (draft) => {
						draft.data.tasks = draft.data.tasks.filter(
							(t) => t.id !== arg.taskId,
						);
					}),
				);
			},
		}),

		deleteTaskFiles: builder.mutation<
			DeleteTaskFilesResponse,
			DeleteTaskFilesRequest
		>({
			query: (body) => ({
				url: `/tasks/${body.taskId}/files/${encodeURIComponent(body.fileId)}`,
				method: "DELETE",
			}),
			onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				const state = getState() as RootState;
				const queryArgs = taskSelectors.getMyTasksFilters({ task: state.task });

				dispatch(
					tasksApi.util.updateQueryData("getMyTasks", queryArgs, (draft) => {
						const index = draft.data.tasks.findIndex(
							(t) => t.id === arg.taskId,
						);
						if (index === -1) {
							return;
						}

						draft.data.tasks[index] = {
							...draft.data.tasks[index],
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
	useLazyGetTaskQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
	useDeleteTaskFilesMutation,
} = tasksApi;
