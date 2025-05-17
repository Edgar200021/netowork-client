import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import { DeleteTaskFilesSchema } from "@/schemas/tasks/deleteTaskFilesSchema";
import type { GetAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import { GetMyTasksSchema } from "@/schemas/tasks/getMyTasksSchema";
import { UpdateTaskSchema } from "@/schemas/tasks/updateTaskSchema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Task } from "@/types/task";

export type GetAllTasksRequest = GetAllTasksSchema;
export type GetAllTasksResponse = ApiSuccessResponse<Task[]>;

export type GetMyTasksRequest = GetMyTasksSchema;
export type GetMyTasksResponse = ApiSuccessResponse<Task[]>;

export type CreateTaskRequest = CreateTaskSchema;
export type CreateTaskResponse = ApiSuccessResponse<Task>;

export type UpdateTaskRequest = UpdateTaskSchema;
export type UpdateTaskResponse = ApiSuccessResponse<Task>;

export type DeleteTaskFilesRequest = DeleteTaskFilesSchema;
export type DeleteTaskFilesResponse = ApiSuccessResponse<Task>;
