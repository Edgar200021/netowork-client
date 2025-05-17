import { z } from "zod";

export const deleteTaskSchema = z.object({
	taskId: z.coerce.number().positive({
		message: "ID задачи должно быть больше 0",
	}),
});

export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>;
