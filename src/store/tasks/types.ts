import { CreateTaskReplySchema } from "@/schemas/tasks/createTaskReplySchema";
import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import type { DeleteTaskFilesSchema } from "@/schemas/tasks/deleteTaskFilesSchema";
import type { DeleteTaskSchema } from "@/schemas/tasks/deleteTaskSchema";
import type { GetAllTasksSchema } from "@/schemas/tasks/getAllTasksSchema";
import { GetMyTaskRepliesSchema } from "@/schemas/tasks/getMyTaskRepliesSchema";
import type { GetMyTasksSchema } from "@/schemas/tasks/getMyTasksSchema";
import type { GetTaskSchema } from "@/schemas/tasks/getTaskSchema";
import type { UpdateTaskSchema } from "@/schemas/tasks/updateTaskSchema";
import type { ApiSuccessResponse } from "@/types/api";
import type { Task, TaskReply } from "@/types/task";
import { GetTasksByMyRepliesSchema } from "../../schemas/tasks/getTasksByMyRepliesSchema";

export type GetAllTasksRequest = GetAllTasksSchema;
export type GetAllTasksResponse = ApiSuccessResponse<{
	tasks: Task[];
	totalCount: number;
}>;

export type GetMyTasksRequest = GetMyTasksSchema;
export type GetMyTasksResponse = ApiSuccessResponse<{
	tasks: Task[];
	totalCount: number;
}>;

export type GetTaskRequest = GetTaskSchema;
export type GetTaskResponse = ApiSuccessResponse<Task>;

export type CreateTaskRequest = CreateTaskSchema;
export type CreateTaskResponse = ApiSuccessResponse<Task>;

export type UpdateTaskRequest = UpdateTaskSchema;
export type UpdateTaskResponse = ApiSuccessResponse<Task>;

export type DeleteTaskRequest = DeleteTaskSchema;
export type DeleteTaskResponse = ApiSuccessResponse<string>;

export type DeleteTaskFilesRequest = DeleteTaskFilesSchema;
export type DeleteTaskFilesResponse = ApiSuccessResponse<Task>;

export type IncrementTaskViewRequest = { taskId: Task["id"] };
export type IncrementTaskViewResponse = ApiSuccessResponse<null>;

export type CreateTaskReplyRequest = CreateTaskReplySchema;
export type CreateTaskReplyResponse = ApiSuccessResponse<null>;

export type GetMyTaskRepliesRequest = GetMyTaskRepliesSchema;
export type GetMyTaskRepliesResponse = ApiSuccessResponse<{
	replies: TaskReply[];
	totalCount: number;
}>;

export type GetTasksByMyRepliesRequest = GetTasksByMyRepliesSchema;
export type GetTasksByMyRepliesResponse = ApiSuccessResponse<{
	tasks: Task[];
	totalCount: number;
}>;
