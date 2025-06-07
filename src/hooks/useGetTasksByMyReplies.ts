import { ROUTES } from "@/constants/routes";
import { useLazyGetTasksByMyRepliesQuery } from "@/store/tasks/taskApi";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useHandleError } from "./useHandleError";
import { taskSelectors } from "@/store/tasks/taskSlice";
import { useAppSelector } from "@/store/store";

export const useGetTasksByMyReplies = (disabledCondition?: boolean) => {
	const [getTasks, { data, error, isLoading, isFetching }] =
		useLazyGetTasksByMyRepliesQuery();
	const path = useLocation().pathname;
	const filters = useAppSelector(taskSelectors.getTasksByMyRepliesFilters);
	useHandleError(error);

	useEffect(() => {
		if (path !== ROUTES.myReplies || disabledCondition) return;

		getTasks(filters);
	}, [path, disabledCondition, filters]);

	return { data, error, isLoading, isFetching };
};
