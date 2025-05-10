import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import type { GetAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Task } from "@/types/task";

export type GetAllTasksRequest = GetAllTasksSchema;
export type GetAllTasksResponse = ApiSuccessResponse<Task[]>;

export type CreateTaskRequest = CreateTaskSchema;
export type CreateTaskResponse = ApiSuccessResponse<Task>