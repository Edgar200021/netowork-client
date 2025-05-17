import { z } from "zod";
import { getAllTasksSchema } from "./getAllTasksSchema";
import { TaskStatus } from "@/types/task";

const schema = z.object({
	status: z.nativeEnum(TaskStatus).optional(),
});

export const getMyTasksSchema = getAllTasksSchema.merge(schema);
export type GetMyTasksSchema = z.infer<typeof getMyTasksSchema>;
