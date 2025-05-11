import { Task } from "./task";

const statuses: Task["status"][] = ["completed", "in_progress", "open"];
export const isTaskStatus = (
	status: string | null | undefined,
): status is Task["status"] => {
	if (!status) return false;

	return statuses.some((s) => s === status);
};
