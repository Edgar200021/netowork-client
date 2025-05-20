import { GET_ALL_TASKS_MAX_LIMIT } from "@/constants/const";
import type { TasksSort } from "@/types/task";
import { z } from "zod";

const sort = [
	"createdAt-asc",
	"createdAt-desc",
	"price-asc",
	"price-desc",
] as const satisfies TasksSort[];

export const getAllTasksSchema = z.object({
	limit: z.coerce
		.number({ message: "limit должен быть числом" })
		.max(GET_ALL_TASKS_MAX_LIMIT)
		.positive({ message: "Лимит должен быть больше 0" })
		.optional(),
	page: z.coerce
		.number({ message: "должна быть числом" })
		.positive({ message: "Страница должна быть больше 0" })
		.optional(),
	search: z
		.string()
		.trim()
		.min(1, { message: "Поле поиска не может быть пустым" })
		.optional(),
	subCategoryIds: z
		.array(z.coerce.number())
		.min(1, { message: "Выберите хотя бы одну подкатегорию" })
		.optional(),
	sort: z
		.array(z.enum(sort))
		.min(1, { message: "Выберите хотя бы один параметр сортировки" })
		.optional(),
});

export type GetAllTasksSchema = z.infer<typeof getAllTasksSchema>;
