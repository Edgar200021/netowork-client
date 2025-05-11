import { cn } from "@/lib/utils";
import { authSlice } from "@/store/auth/authSlice";
import { Link } from "react-router";
import { ROUTES } from "../constants/routes";
import { useAppSelector } from "../store/store";
import { Button } from "./ui/button";
import { Logo } from "./ui/logo";
import { UserProfile } from "./UserProfile";

interface Props {
	className?: string;
}

export const Header = ({ className }: Props) => {
	const user = useAppSelector(authSlice.selectors.getUser);

	return (
		<header className={cn("py-3 sm:py-4  bg-white", className)}>
			<div className="box flex items-center justify-between gap-x-5">
				<Logo />
				{!user ? (
					<Button asChild>
						<Link to={ROUTES.login}>Войти</Link>
					</Button>
				) : (
					<UserProfile user={user} />
				)}
			</div>
		</header>
	);
};
