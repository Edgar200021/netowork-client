import { z } from "zod";

export const forgotPasswordSchema = z.object({
	email: z.string().email("Некорректный эл. адрес"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
