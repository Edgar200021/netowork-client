import { z } from "zod";
import {
	MAX_TASK_REPLY_DESCRIPTION_LENGTH,
	MIN_TASK_REPLY_DESCRIPTION_LENGTH,
} from "@/constants/const";

export const createTaskReplySchema = z.object({
	taskId: z.string().uuid({
		message: "ID задачи должен быть UUID",
	}),
	description: z
		.string()
		.min(MIN_TASK_REPLY_DESCRIPTION_LENGTH, {
			message: `Минимальная длина описания задачи ${MIN_TASK_REPLY_DESCRIPTION_LENGTH} символов`,
		})
		.max(MAX_TASK_REPLY_DESCRIPTION_LENGTH, {
			message: `Максимальная длина описания задачи ${MAX_TASK_REPLY_DESCRIPTION_LENGTH} символов`,
		}),
});

export type CreateTaskReplySchema = z.infer<typeof createTaskReplySchema>;
