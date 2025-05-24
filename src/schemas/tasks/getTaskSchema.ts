import { z } from "zod";

export const getTaskSchema = z.object({
	taskId: z.coerce.number().positive({
		message: "ID задачи должно быть больше 0",
	}),
});

export type GetTaskSchema = z.infer<typeof getTaskSchema>;
