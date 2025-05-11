import { z } from "zod";
import { getAllTasksSchema } from "./getAllTasksSchema";

const schema = z.object({
	status: z.enum(["completed", "in_progress", "open"] as const).optional(),
});

export const getMyTasksSchema = getAllTasksSchema.merge(schema);
export type GetMyTasksSchema = z.infer<typeof getMyTasksSchema>;
