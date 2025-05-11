import { MIN_PASSWORD_LENGTH } from "@/constants/const";
import { z } from "zod";
import zxcvbn from "zxcvbn";

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, "Токен не может быть пустым"),
		password: z
			.string()
			.min(MIN_PASSWORD_LENGTH, "Минимальная длина пароля 8 символов"),
		passwordConfirm: z.string(),
	})
	.superRefine(({ password }, ctx) => {
		const result = zxcvbn(password);

		if (result.score == 0 || result.score == 1) {
			ctx.addIssue({
				code: "custom",
				path: ["password"],
				message: "Пароль слишком простой",
			});
		}
	})
	.refine((obj) => obj.password === obj.passwordConfirm, {
		path: ["passwordConfirm"],
		message: "Пароли не совпадают",
	});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
