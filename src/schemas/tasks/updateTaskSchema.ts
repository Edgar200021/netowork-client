import { z } from "zod";
import { createTaskSchema } from "./createTaskSchema";

const partialCreateTaskSchema = createTaskSchema.partial();

export const updateTaskSchema = z
	.object({
		taskId: z.number().positive({ message: "ID задачи должен быть больше 0" }),
	})
	.merge(partialCreateTaskSchema);

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
