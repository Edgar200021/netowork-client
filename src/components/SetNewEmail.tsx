import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";
import {
	type SetNewEmailSchema,
	setNewEmailSchema,
} from "@/schemas/auth/setNewEmailSchema";
import { useSetNewEmailAddressMutation } from "@/store/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "./FieldError";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
	className?: string;
}

export const SetNewEmail = memo(({ className }: Props) => {
	const [setNewEmail, { isLoading, error, data }] =
		useSetNewEmailAddressMutation();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<SetNewEmailSchema>({
		resolver: zodResolver(setNewEmailSchema),
	});
	const { setParams } = useQueryParams("email");
	const [showForm, setShowForm] = useState(false);
	const { apiValidationErrors } =
		useHandleError<(keyof SetNewEmailSchema)[]>(error);

	useHandleApiResponse(data, {
		callback: () => {
			setParams("email", getValues("newEmail"));
			setShowForm(false);
		},
	});

	const onSubmit = (data: SetNewEmailSchema) => {
		setNewEmail({
			newEmail: data.newEmail,
		});
	};

	if (!showForm)
		return (
			<Button
				onClick={() => setShowForm(true)}
				disabled={isLoading}
				variant="link"
				className="p-0"
			>
				Указать другую почту
			</Button>
		);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("flex flex-col gap-y-5", className)}
		>
			<div className="flex flex-col gap-y-1">
				<Input type="email" {...register("newEmail")} placeholder="Email" />
				{(errors.newEmail?.message || apiValidationErrors.newEmail) && (
					<FieldErrors
						error={errors.newEmail?.message || apiValidationErrors.newEmail!}
					/>
				)}
			</div>

			<Button disabled={isLoading}>
				{isLoading ? "Загрузка..." : "Подтвердить"}
			</Button>
		</form>
	);
});
