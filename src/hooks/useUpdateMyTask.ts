import {
	updateTaskSchema,
	UpdateTaskSchema,
} from "@/schemas/tasks/updateTaskSchema";
import { useUpdateTaskMutation } from "@/store/tasks/taskApi";
import { useState } from "react";
import { useHandleError } from "./useHandleError";

export const useUpdateMyTask = <K extends (keyof UpdateTaskSchema)[]>(
	data: UpdateTaskSchema,
	errorKeys: K,
	disableCondition?: boolean,
): {
	onSubmit: () => Promise<void>;
	isError: boolean;
	errors: Partial<Record<K[number], string>>;
	apiValidationErrors?: Partial<Record<K[number], string>>;
	isLoading: boolean;
} => {
	const [errors, setErrors] = useState<Partial<Record<K[number], string>>>({});
	const [updateTask, { error, isLoading, isError }] = useUpdateTaskMutation();
	const { apiValidationErrors } = useHandleError<K>(error);

	const onSubmit = async () => {
		if (disableCondition) return;

		const parsed = await updateTaskSchema.safeParseAsync(data);

		if (!parsed.success) {
			for (const err of parsed.error.errors) {
				const key = err.path[0] as K[number];
				if (errorKeys.includes(key)) {
					setErrors((prev) => ({
						...prev,
						[key]: err.message,
					}));
				}
			}
			return;
		}

		setErrors({});
		await updateTask(data).unwrap();
	};

	return {
		onSubmit,
		isError,
		errors,
		apiValidationErrors: apiValidationErrors as Partial<
			Record<K[number], string>
		>,
		isLoading,
	};
};
