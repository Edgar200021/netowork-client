import { SpecificTask } from "@/components/Tasks/SpecificTask";
import { Loader } from "@/components/ui/loader";
import { SPECIFIC_TASK_PARAM } from "@/constants/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { getTaskSchema } from "@/schemas/tasks/getTaskSchema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useLazyGetTaskQuery } from "@/store/tasks/taskApi";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";
import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

interface Props {
	className?: string;
}

export const SpecificTaskPage = ({ className }: Props) => {
	const task = useAppSelector(taskSelectors.getSpecificTask);
	const taskId = useParams()[SPECIFIC_TASK_PARAM];
	const dispatch = useAppDispatch()

	const [getTask, { isLoading, error }] = useLazyGetTaskQuery();
	useHandleError(error);

	useEffect(() => {
		if (task) return;

		(async () => {
			console.log("DOOOOO REQUEST");
			const { data, error } = await getTaskSchema.safeParseAsync({
				taskId,
			});
			if (error) {
				toast.error(error.errors[0].message);
				return;
			}

			const taskData = await getTask({
				taskId: data.taskId,
			}).unwrap();
			dispatch(taskActions.setSpecificTask(taskData.data))
		})();
	}, []);

	if (isLoading)
		return (
			<div className="box flex items-center justify-center py-32">
				<Loader size="lg" />
			</div>
		);
	if (!task) return null;

	return (
		<main className={className}>
			<div className="box">
				<SpecificTask task={task} className="md:mt-32" />
			</div>
		</main>
	);
};
