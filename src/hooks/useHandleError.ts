import { isApiError, isApiValidationError } from "@/guards/api";
import { isRtkError } from "@/guards/redux";
import type { ApiValidationError } from "@/types/api";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useHandleError = <T extends string[]>(
	error?: unknown,
	disabled = false,
) => {
	const [apiValidationErrors, setApiValidationErrors] = useState<
		ApiValidationError<T>["errors"]
	>({});

	useEffect(() => {
		if (!error || disabled) return;
		const rtkError = isRtkError(error);

		if (rtkError && error.originalStatus === 429) {
			toast.error("Слишком много запросов");
			return;
		}

		const err = rtkError ? error.data : error;

		if (isApiValidationError(err)) {
			setApiValidationErrors(err.errors);
			return;
		}

		toast.error(
			isApiError(err)
				? err.error
				: err instanceof Error
					? err.message
					: "Что-то пошло не так",
		);
	}, [error, disabled]);

	const handleError = useCallback((error: unknown) => {
		if (!error) return;
		const rtkError = isRtkError(error);

		if (rtkError && error.originalStatus === 429) {
			toast.error("Слишком много запросов");
			return;
		}

		const err = rtkError ? error.data : error;

		if (isApiValidationError(err)) {
			setApiValidationErrors(err.errors);
		}

		toast.error(
			isApiError(err)
				? err.error
				: err instanceof Error
					? err.message
					: "Что-то пошло не так",
		);
	}, []);

	const setValidationError = useCallback((key: T[number], message: string) => {
		setApiValidationErrors((prev) => ({ ...prev, [key]: message }));
	}, []);

	const clearError = useCallback(() => {
		setApiValidationErrors({});
	}, []);

	return { apiValidationErrors, handleError, setValidationError, clearError };
};
