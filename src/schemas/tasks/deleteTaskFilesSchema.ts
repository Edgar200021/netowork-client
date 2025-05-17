import { z } from "zod";
import { deleteTaskSchema } from "./deleteTaskSchema";

export const deleteTaskFilesSchema = z
	.object({
		fileId: z.string().nonempty({
			message: "ID файла не может быть пустым",
		}),
	})
	.merge(deleteTaskSchema);

export type DeleteTaskFilesSchema = z.infer<typeof deleteTaskFilesSchema>;
