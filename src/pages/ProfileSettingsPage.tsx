import { AccountSettings } from "@/components/AccountSettings/AccountSettings";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { Navigate } from "react-router";

interface Props {
	className?: string;
}

export const AccountSettingsPage = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);

	if (!user) return <Navigate to={ROUTES.login} />;

	return (
		<div className={cn("", className)}>
			<AccountSettings />
		</div>
	);
};
