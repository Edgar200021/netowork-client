import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/constants/routes";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import {
	forgotPasswordSchema,
	ForgotPasswordSchema,
} from "@/schemas/auth/forgotPasswordSchema";
import { useForgotPasswordMutation } from "@/store/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { FieldErrors } from "../FieldError";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface Props {
	className?: string;
}

export const ForgotPasswordForm = ({ className }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
	});
	const [forgotPassword, { isLoading, data, error }] =
		useForgotPasswordMutation();
	const { apiValidationErrors } =
		useHandleError<(keyof ForgotPasswordSchema)[]>(error);

	useHandleApiResponse(data);

	const onSubmit = ({ email }: ForgotPasswordSchema) => {
		forgotPassword({
			email,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn(
				className,
				"rounded-[16px] py-8 px-4 bg-white shadow-form max-w-[450px] mx-auto",
			)}
		>
			<fieldset disabled={isLoading} className="m-0 p-0">
				<h1 className="text-primary-foreground font-semibold text-[25px] leading-[130%] capitalize text-center mb-8 ">
					Восстановление пароля
				</h1>
				<p className="text-center leading-[140%] mb-8">
					Введите email, который вы использовали при регистрации
				</p>

				<div className="flex flex-col gap-y-5 mb-3">
					<label className="flex flex-col gap-y-2">
						<span className="leading-[140%] text-secondary-foreground">
							Email
						</span>
						<Input {...register("email")} type="email" required />
						{(apiValidationErrors?.email || errors.email?.message) && (
							<FieldErrors
								error={apiValidationErrors?.email || errors.email!.message!}
							/>
						)}
					</label>
				</div>

				<div className="flex flex-col gap-y-2">
					<Button>{isLoading ? "Загрузка..." : "Восстановить"}</Button>
					<Button asChild variant="secondary" type="button">
						<Link to={ROUTES.login}>Войти</Link>
					</Button>
				</div>
			</fieldset>
		</form>
	);
};
