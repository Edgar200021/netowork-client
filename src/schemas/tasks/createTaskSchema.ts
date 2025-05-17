import {
	FILES_MAX_SIZE,
	MAX_TASK_DESCRIPTION_LENGTH,
	MAX_TASK_TITLE_LENGTH,
	MIN_TASK_DESCRIPTION_LENGTH,
	MIN_TASK_TITLE_LENGTH,
	TASK_FILES_ALLOWED_TYPES,
	TASK_FILES_MAX_COUNT,
} from "@/constants/const";
import { z } from "zod";

export const createTaskSchema = z.object({
	title: z
		.string()
		.trim()
		.min(MIN_TASK_TITLE_LENGTH, {
			message: `Минимальная длина заголовка задачи ${MIN_TASK_TITLE_LENGTH} символов`,
		})
		.max(MAX_TASK_TITLE_LENGTH, {
			message: `Максимальная длина заголовка задачи ${MAX_TASK_TITLE_LENGTH} символов`,
		}),
	description: z
		.string()
		.trim()
		.min(MIN_TASK_DESCRIPTION_LENGTH, {
			message: `Минимальная длина описания задачи ${MIN_TASK_DESCRIPTION_LENGTH} символов`,
		})
		.max(MAX_TASK_DESCRIPTION_LENGTH, {
			message: `Максимальная длина описания задачи ${MAX_TASK_DESCRIPTION_LENGTH} символов`,
		}),
	categoryId: z.coerce.number().positive({
		message: "Категория задачи должна быть больше 0",
	}),
	subCategoryId: z.coerce.number().positive({
		message: "Подкатегория задачи должна быть больше 0",
	}),
	price: z.coerce.number().positive({
		message: "Цена задачи должна быть больше 0",
	}),
	files: z
		.array(z.instanceof(File))
		.max(TASK_FILES_MAX_COUNT, {
			message: `Максимальное количество файлов ${TASK_FILES_MAX_COUNT}`,
		})
		.refine(
			(files) =>
				files.every(
					(file) =>
						file.size < FILES_MAX_SIZE &&
						TASK_FILES_ALLOWED_TYPES.includes(file.type),
				),
			{
				message: "Недопустимые типы файлов",
			},
		)
		.optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
