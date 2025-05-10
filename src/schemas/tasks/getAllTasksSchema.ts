import { GET_ALL_TASKS_MAX_LIMIT } from "@/constants/const";
import { z } from "zod";

export const getAllTasksSchema = z.object({
	limit: z.coerce
		.number()
		.max(GET_ALL_TASKS_MAX_LIMIT)
		.positive({ message: "Лимит должен быть больше 0" })
		.optional(),
	page: z.coerce
		.number()
		.positive({ message: "Страница должна быть больше 0" })
		.optional(),
});

export type GetAllTasksSchema = z.infer<typeof getAllTasksSchema>;