import { z } from "zod";

export const getTaskSchema = z.object({
	taskId: z.string({ message: "ID задачи должен быть строкой" }).uuid({
		message: "ID задачи должен быть UUID",
	}),
});

export type GetTaskSchema = z.infer<typeof getTaskSchema>;
