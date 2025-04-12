import { MIN_PASSWORD_LENGTH } from "@/constants/const";
import { z } from "zod";
import zxcvbn from "zxcvbn";

export const changePasswordSchema = z
	.object({
		oldPassword: z.string(),
		newPassword: z
			.string()
			.min(MIN_PASSWORD_LENGTH, "Минимальная длина пароля 8 символов"),
		newPasswordConfirmation: z.string(),
	})
	.superRefine(({ newPassword }, ctx) => {
		const result = zxcvbn(newPassword);

		if (result.score === 0 || result.score === 1) {
			ctx.addIssue({
				code: "custom",
				path: ["password"],
				message: "Пароль слишком простой",
			});
		}
	})
	.refine((obj) => obj.newPassword === obj.newPasswordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Пароли не совпадают",
	});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
