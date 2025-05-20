import { TaskStatus } from "@/types/task";
import { z } from "zod";
import { getAllTasksSchema } from "./getAllTasksSchema";

const schema = z.object({
	status: z.nativeEnum(TaskStatus).optional(),
});

export const getMyTasksSchema = schema.merge(
	getAllTasksSchema.pick({
		page: true,
		limit: true,
	}),
);
export type GetMyTasksSchema = z.infer<typeof getMyTasksSchema>;
