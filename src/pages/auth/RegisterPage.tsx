import { RegisterForm } from "@/components/forms/RegisterForm";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { useAppSelector } from "@/store/store";
import { Navigate } from "react-router";

interface Props {
	className?: string;
}

export const RegisterPage = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);

	if (user) return <Navigate to={ROUTES.profile} />;

	return (
		<main className={cn(className, "box")}>
			<RegisterForm />
		</main>
	);
};
