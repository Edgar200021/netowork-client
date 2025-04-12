import { z } from "zod";

export const setNewEmailSchema = z.object({
	newEmail: z.string().email("Некорректный эл. адрес"),
});

export type SetNewEmailSchema = z.infer<typeof setNewEmailSchema>;
