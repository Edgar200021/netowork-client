import { ROUTES } from "@/constants/routes";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { UserRole } from "@/types/user";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Props {
	roles?: UserRole[];
}

export const ProtectedPage = ({ roles }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);
	const isAuthorized = useAppSelector(authSlice.selectors.getIsAuthorized);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthorized) return;

		toast.error("Вы не авторизованы");
		navigate(ROUTES.login);
	}, [isAuthorized]);

	useEffect(() => {
		if (!user || !roles) return;

		if (!roles.includes(user.role)) {
			toast.error("У вас нет доступа к этой странице");
		}
	}, [user, roles]);

	if (!user) return <Navigate to={ROUTES.login} />;
	if (roles && !roles.includes(user.role)) return <Navigate to={ROUTES.main} />;

	return <Outlet />;
};
