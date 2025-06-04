import { useIncrementTaskViewMutation } from "@/store/tasks/taskApi";
import type { Task } from "@/types/task";
import { useEffect } from "react";

interface Props {
	taskId: Task["id"];
	disabled?: boolean;
}

export const IncrementTaskView = ({ disabled, taskId }: Props) => {
	const [incrementView] = useIncrementTaskViewMutation();

	useEffect(() => {
		if (disabled) return;

		incrementView({
			taskId,
		});
	}, [disabled, taskId]);

	return null;
};
