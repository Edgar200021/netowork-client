import { Task, TaskStatus } from "./task";

export const isTaskStatus = (
	status: string | null | undefined,
): status is Task["status"] => {
	if (!status) return false;

	return Object.values(TaskStatus).some((s) => s === status);
};
