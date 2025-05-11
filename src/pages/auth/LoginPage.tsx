import { LoginForm } from "@/components/forms/LoginForm";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { Navigate } from "react-router";

interface Props {
	className?: string;
}

export const LoginPage = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);

	if (user) return <Navigate to={ROUTES.profile} />;

	return (
		<main className={cn(className, "box")}>
			<LoginForm />
		</main>
	);
};
