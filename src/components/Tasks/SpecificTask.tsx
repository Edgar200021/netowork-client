import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/store";
import { taskSelectors } from "@/store/tasks/taskSlice";
import type { Task } from "@/types/task";
import { Button } from "../ui/button";
import { ReplyToTask } from "./ReplyToTask";
import { TaskHeader } from "./TaskHeader";

interface Props {
	className?: string;
	taskId: Task["id"];
}

export const SpecificTask = ({ className, taskId }: Props) => {
	const task = useAppSelector(taskSelectors.getSpecificTask);

	if (!task) return null;
	return (
		<div
			className={cn(
				"max-w-[1200px] mx-auto w-full flex flex-col gap-y-6 md:gap-y-8",
				className,
			)}
		>
			<TaskHeader
				title={task.title}
				price={task.price}
				createdAt={task.createdAt}
			/>
			<dl className="text-base flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-2">
					<dt className="font-semibold leading-[130%]">Заказчик</dt>
					<dd className="leading-[140%]">{task.creator}</dd>
				</div>

				<div className="flex flex-col gap-y-2 md:hidden">
					<dt className="font-semibold leading-[130%]">Описание услуги</dt>
					<dd className="leading-[140%]">
						<p>{task.description}</p>
					</dd>
				</div>

				<div className="flex items-end gap-x-5 justify-between">
					<div className="flex flex-col gap-y-2 max-md:hidden">
						<dt className="font-semibold leading-[130%]">Описание услуги</dt>
						<dd className="leading-[140%]">
							<p className="max-w-[600px]">{task.description}</p>
						</dd>
					</div>

					<ReplyToTask
						className="max-md:hidden"
						taskId={taskId}
						price={task.price}
					/>
				</div>
			</dl>

			<ReplyToTask className="md:hidden" taskId={taskId} price={task.price} />
		</div>
	);
};
