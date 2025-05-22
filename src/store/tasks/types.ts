import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import type { DeleteTaskFilesSchema } from "@/schemas/tasks/deleteTaskFilesSchema";
import type { DeleteTaskSchema } from "@/schemas/tasks/deleteTaskSchema";
import type { GetAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import type { GetMyTasksSchema } from "@/schemas/tasks/getMyTasksSchema";
import type { UpdateTaskSchema } from "@/schemas/tasks/updateTaskSchema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Task } from "@/types/task";

export type GetAllTasksRequest = GetAllTasksSchema;
export type GetAllTasksResponse = ApiSuccessResponse<{
	tasks: Task[],
	totalCount:number
}>;

export type GetMyTasksRequest = GetMyTasksSchema;
export type GetMyTasksResponse = ApiSuccessResponse<{
	tasks: Task[],
	totalCount:number
}>;

export type CreateTaskRequest = CreateTaskSchema;
export type CreateTaskResponse = ApiSuccessResponse<Task>;

export type UpdateTaskRequest = UpdateTaskSchema;
export type UpdateTaskResponse = ApiSuccessResponse<Task>;

export type DeleteTaskRequest = DeleteTaskSchema;
export type DeleteTaskResponse = ApiSuccessResponse<string>;

export type DeleteTaskFilesRequest = DeleteTaskFilesSchema;
export type DeleteTaskFilesResponse = ApiSuccessResponse<Task>;
