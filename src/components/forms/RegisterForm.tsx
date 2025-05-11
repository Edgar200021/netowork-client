import { cn } from "@/lib/utils";
import {
	registerSchema,
	type RegisterSchema,
} from "@/schemas/auth/registerSchema";
import { Controller, useForm } from "react-hook-form";

import { ROUTES } from "@/constants/routes";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { useRegisterMutation } from "@/store/auth/authApi";
import { UserRole } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Link, useNavigate } from "react-router";
import { FieldErrors } from "../FieldError";
import { PasswordInput } from "../PasswordInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface Props {
	className?: string;
}

export const RegisterForm = ({ className }: Props) => {
	const {
		register,
		handleSubmit,
		getValues,
		watch,
		control,
		formState: { errors },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: UserRole.Freelancer,
		},
	});
	const [registerMutation, { isLoading, data, error }] = useRegisterMutation();
	const { apiValidationErrors } =
		useHandleError<
			(keyof Omit<RegisterSchema, "agreeTerms" | "passwordConfirm">)[]
		>(error);
	const navigate = useNavigate();

	useHandleApiResponse(data, {
		showToast: false,
		callback: () => {
			const email = getValues("email");

			navigate(`${ROUTES.confirmEmailAddress}?email=${email}`);
		},
	});

	const role = watch("role");

	const onSubmit = (data: RegisterSchema) => {
		registerMutation({
			role: data.role,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			passwordConfirmation: data.passwordConfirmation,
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
					Регистрация
				</h1>
				<div className="flex w-full mb-10">
					<label
						className={cn(
							"inline-flex items-center justify-center w-1/2 py-2 px-3 rounded-l-md border-border border-[1px]  border-r-0 cursor-pointer leading-[137%]",
							{
								"border-r-[1px] border-primary": role === UserRole.Freelancer,
							},
						)}
					>
						<input
							className="invisible"
							type="radio"
							value={UserRole.Freelancer}
							{...register("role")}
						/>
						Я фрилансер
					</label>
					<label
						className={cn(
							"inline-flex items-center justify-center w-1/2 py-2 px-3 rounded-r-md border-border border-[1px]  border-l-0 cursor-pointer leading-[137%]",
							{
								"border-l-[1px] border-primary": role === UserRole.Client,
							},
						)}
					>
						Я заказчик
						<input
							{...register("role")}
							className="invisible"
							type="radio"
							value={UserRole.Client}
						/>
					</label>
				</div>

				<div className="flex flex-col gap-y-5 mb-8">
					<label className="flex flex-col gap-y-2">
						<span className="leading-[140%] text-secondary-foreground">
							Имя
						</span>
						<Input {...register("firstName")} required />
						{(apiValidationErrors?.firstName || errors.firstName?.message) && (
							<FieldErrors
								error={
									apiValidationErrors?.firstName || errors.firstName!.message!
								}
							/>
						)}
					</label>
					<label className="flex flex-col gap-y-2">
						<span className="leading-[140%] text-secondary-foreground">
							Фамилия
						</span>
						<Input {...register("lastName")} required />
						{(apiValidationErrors?.lastName || errors.lastName?.message) && (
							<FieldErrors
								error={
									apiValidationErrors?.lastName || errors.lastName!.message!
								}
							/>
						)}
					</label>
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
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<PasswordInput inputProps={field}>
								{(apiValidationErrors?.password ||
									errors.password?.message) && (
									<FieldErrors
										error={
											apiValidationErrors?.password || errors.password!.message!
										}
									/>
								)}
							</PasswordInput>
						)}
					/>

					<label className="flex flex-col gap-y-2">
						<span className="leading-[140%] text-secondary-foreground">
							Подтверждение пароля
						</span>
						<Input
							{...register("passwordConfirmation")}
							required
							type="password"
						/>
						{errors.passwordConfirmation?.message && (
							<FieldErrors error={errors.passwordConfirmation.message} />
						)}
					</label>

					<Controller
						control={control}
						name="agreeTerms"
						render={({ field }) => (
							<label className="flex items-center gap-x-3 cursor-pointer">
								<Checkbox
									className="w-4 h-4 border-border rounded-[3px] border"
									onCheckedChange={(e) => field.onChange(e)}
								/>
								Согласен с Privacy policy
							</label>
						)}
					/>
				</div>
				<div className="flex flex-col gap-y-2">
					<Button>{isLoading ? "Загрузка..." : "Зарегистрироваться"}</Button>
					<Button asChild variant="secondary" type="button">
						<Link to={ROUTES.login}>Уже есть аккаунт</Link>
					</Button>
				</div>
			</fieldset>
		</form>
	);
};
