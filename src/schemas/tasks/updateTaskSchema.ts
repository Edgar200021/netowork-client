import { z } from "zod";
import { createTaskSchema } from "./createTaskSchema";

const partialCreateTaskSchema = createTaskSchema.partial();

export const updateTaskSchema = z
	.object({
		taskId: z.string().uuid({
			message: "ID задачи должен быть UUID",
		}),
		notifyAboutReplies: z.boolean().optional(),
	})
	.merge(partialCreateTaskSchema);

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
