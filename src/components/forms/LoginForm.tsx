import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";

import { ROUTES } from "@/constants/routes";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { loginSchema, type LoginSchema } from "@/schemas/auth/loginSchema";
import { useLoginMutation } from "@/store/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { FieldErrors } from "../FieldError";
import { PasswordInput } from "../PasswordInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface Props {
	className?: string;
}

export const LoginForm = ({ className }: Props) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});
	const [login, { isLoading, data, error }] = useLoginMutation();
	const { apiValidationErrors } = useHandleError<(keyof LoginSchema)[]>(error);
	const navigate = useNavigate();

	useHandleApiResponse(data, {
		toastText: "Авторизация прошла успешно",
		callback: () => {
			navigate(ROUTES.profile);
		},
	});

	const onSubmit = ({ email, password }: LoginSchema) => {
		login({
			email,
			password,
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
					Авторизация
				</h1>

				<div className="flex flex-col gap-y-5 mb-3">
					<label className="flex flex-col gap-y-2">
						<span className="leading-[140%] text-secondary-foreground">
							Email
						</span>
						<Input {...register("email")} type="email" required />
						{(apiValidationErrors.email || errors.email?.message) && (
							<FieldErrors
								error={apiValidationErrors.email || errors.email!.message!}
							/>
						)}
					</label>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<PasswordInput inputProps={field}>
								{(apiValidationErrors.password || errors.password?.message) && (
									<FieldErrors
										error={
											apiValidationErrors.password || errors.password!.message!
										}
									/>
								)}
							</PasswordInput>
						)}
					/>
				</div>
				<Button
					variant="link"
					type="button"
					asChild
					className="mb-6 p-0 text-sm "
				>
					<Link to={ROUTES.forgotPassword} className="text-primary-foreground ">
						Восстановить пароль
					</Link>
				</Button>
				<div className="flex flex-col gap-y-2">
					<Button>{isLoading ? "Загрузка..." : "Войти"}</Button>
					<Button asChild variant="secondary" type="button">
						<Link to={ROUTES.register}>Зарегистрироваться</Link>
					</Button>
				</div>
			</fieldset>
		</form>
	);
};
