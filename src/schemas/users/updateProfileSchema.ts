import {
	MAX_FIRST_NAME_LENGTH,
	MAX_LAST_NAME_LENGTH,
	MIN_FIRST_NAME_LENGTH,
	MIN_LAST_NAME_LENGTH,
} from "@/constants/const";
import { z } from "zod";

export const updateProfileSchema = z.object({
	firstName: z.string().min(MIN_FIRST_NAME_LENGTH).max(MAX_FIRST_NAME_LENGTH),
	lastName: z.string().min(MIN_LAST_NAME_LENGTH).max(MAX_LAST_NAME_LENGTH),
	email: z.string().email("Некорректный эл. адрес"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
