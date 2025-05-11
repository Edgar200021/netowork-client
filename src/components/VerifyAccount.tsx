import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/ui/pageLoader";
import { ROUTES } from "@/constants/routes";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useVerifyAccountMutation } from "@/store/auth/authApi";
import { UserRole } from "@/types/user";
import { useEffect } from "react";
import { Link } from "react-router";
import sprites from "../assets/icons/sprites.svg";

interface Props {
	className?: string;
	token: string;
}

export const VerifyAccount = ({ className, token }: Props) => {
	const [verify, { isLoading, data, error }] = useVerifyAccountMutation();

	useHandleError(error);
	useHandleApiResponse(data, {
		toastText: "Почта подтверждена",
	});

	useEffect(() => {
		verify({ token });
	}, [token]);

	if (isLoading) return <PageLoader />;
	if (!data) return null;

	return (
		<div
			className={cn(
				"max-w-xs mx-auto flex items-center flex-col justify-center",
				className,
			)}
		>
			<svg height={320} className="mb-4 w-full">
				<use xlinkHref={`${sprites}#account-verified`} />
			</svg>
			<span className="font-semibold text-2xl leading-[130%] mb-6">
				Ваша почта подтверждена
			</span>
			<Button className="w-[90%] text-lg" asChild>
				<Link to={ROUTES.main}>
					{data.data.role === UserRole.Freelancer
						? "Найти задание"
						: "Создать задание"}
				</Link>
			</Button>
		</div>
	);
};
