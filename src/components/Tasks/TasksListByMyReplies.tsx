import { cn } from "@/lib/utils";
import type { GetTasksByMyRepliesResponse } from "../../store/tasks/types";
import { SpecificTask } from "./SpecificTask";
interface Props {
	className?: string;
	data: GetTasksByMyRepliesResponse;
}

export const TasksListByMyReplies = ({ className, data }: Props) => {
	return (
		<ul className={cn(className, "flex flex-col gap-y-20 items-start")}>
			{data.data.tasks.map((task) => (
				<li className="w-full" key={task.id}>
					<SpecificTask
						type="message"
						className="mx-0 max-w-full"
						task={task}
					/>
				</li>
			))}
		</ul>
	);
};
