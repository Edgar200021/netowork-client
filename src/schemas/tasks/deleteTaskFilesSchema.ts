import { z } from "zod";

export const deleteTaskFilesSchema = z.object({
	taskId: z.coerce.number().positive({
		message: "ID задачи должно быть больше 0",
	}),
	fileId: z.string().nonempty({
		message: "ID файла не может быть пустым",
	}),
});

export type DeleteTaskFilesSchema = z.infer<typeof deleteTaskFilesSchema>;
