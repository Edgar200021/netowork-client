import { z } from "zod";
import { MY_TASK_REPLIES_MAX_LIMIT } from "@/constants/const";

export const getMyTaskRepliesSchema = z.object({
	taskId: z.string().uuid({
		message: "ID задачи должен быть UUID",
	}),
	page: z.coerce
		.number({ message: "должна быть числом" })
		.positive({ message: "Страница должна быть больше 0" })
		.optional(),
	limit: z.coerce
		.number({
			message: "limit должен быть числом",
		})
		.max(MY_TASK_REPLIES_MAX_LIMIT)
		.positive({
			message: "Лимит должен быть больше 0",
		})
		.optional(),
});

export type GetMyTaskRepliesSchema = z.infer<typeof getMyTaskRepliesSchema>;
