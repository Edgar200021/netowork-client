import { MIN_PASSWORD_LENGTH } from "@/constants/const";
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Некорректный эл. адрес"),
	password: z
		.string()
		.min(MIN_PASSWORD_LENGTH, "Минимальная длина пароля 8 символов"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
