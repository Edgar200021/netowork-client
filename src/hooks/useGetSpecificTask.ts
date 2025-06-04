import { SPECIFIC_TASK_PARAM } from "@/constants/routes";
import { getTaskSchema } from "@/schemas/tasks/getTaskSchema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useLazyGetTaskQuery } from "@/store/tasks/taskApi";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useHandleError } from "./useHandleError";

export const useGetSpecificTask = () => {
	const task = useAppSelector(taskSelectors.getSpecificTask);
	const taskId = useParams()[SPECIFIC_TASK_PARAM];
	const dispatch = useAppDispatch();
	const [fromRequest, setFromRequest] = useState(false);

	const [getTask, { isLoading, error }] = useLazyGetTaskQuery();
	useHandleError(error);

	useEffect(() => {
		if (task) {
			setFromRequest(false);
			return;
		}

		(async () => {
			const { data, error } = await getTaskSchema.safeParseAsync({
				taskId,
			});
			if (error) {
				toast.error(error.errors[0].message);
				return;
			}

			setFromRequest(true);
			const taskData = await getTask({
				taskId: data.taskId,
			}).unwrap();
			dispatch(taskActions.setSpecificTask(taskData.data));
		})();
	}, []);

	return {
		task,
		isLoading,
		fromRequest,
	};
};
