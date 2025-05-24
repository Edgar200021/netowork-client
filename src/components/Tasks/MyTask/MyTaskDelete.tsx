import { Button } from "@/components/ui/button";
import { useHandleError } from "@/hooks/useHandleError";
import { deleteTaskSchema } from "@/schemas/tasks/deleteTaskSchema";
import { useDeleteTaskMutation } from "@/store/tasks/taskApi";
import type { Task } from "@/types/task";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
	taskId: Task["id"];
}

export const MyTaskDelete = ({ taskId }: Props) => {
	const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();
	const { apiValidationErrors } = useHandleError<["taskId"]>(error);

	const onDelete = async () => {
		const { success, error } = await deleteTaskSchema.safeParseAsync({
			taskId,
		});
		if (!success) {
			toast.error(`${error.errors[0].message}`);
			return;
		}
		await deleteTask({ taskId });
	};

	useEffect(() => {
		if (!apiValidationErrors?.taskId) return;
		toast.error(apiValidationErrors.taskId);
	}, [apiValidationErrors?.taskId]);

	return (
		<Button onClick={onDelete} disabled={isLoading} variant="destructive">
			{isLoading ? "Загрузка..." : "Отменить заказ"}
		</Button>
	);
};
