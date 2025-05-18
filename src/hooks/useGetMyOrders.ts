import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

//TODO
export const useGetMyOrders = (disabledCondition?: boolean) => {
	const [data, setData] = useState<string | null>(null);
	const path = useLocation().pathname;

	useEffect(() => {
		if (path !== ROUTES.myOrders || disabledCondition) return;

		setData("Some data");
	}, [path, disabledCondition]);

	return { data };
};
