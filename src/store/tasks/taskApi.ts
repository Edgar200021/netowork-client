import { TASK_FILES_NAME } from "@/constants/const";
import { baseApi } from "../baseApi";
import type {
	CreateTaskRequest,
	CreateTaskResponse,
	GetAllTasksRequest,
	GetAllTasksResponse,
	GetMyTasksRequest,
	GetMyTasksResponse,
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
			onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(
					tasksApi.util.updateQueryData("getAllTasks", {}, (draft) => {
						draft.data.push(data.data);
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
} = tasksApi;
