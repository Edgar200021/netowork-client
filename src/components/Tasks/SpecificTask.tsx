import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";
import { ReplyToTask } from "./ReplyToTask";
import { TaskHeader } from "./TaskHeader";
import { Button } from "../ui/button";

interface Props {
	className?: string;
	task: Task;
	type: "reply" | "message";
}

export const SpecificTask = ({ className, task, type }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[1200px] mx-auto w-full flex flex-col gap-y-6 md:gap-y-8",
				className,
			)}
		>
			<TaskHeader
				views={task.views}
				title={task.title}
				price={task.price}
				createdAt={task.createdAt}
				id={task.id}
			/>
			<dl className="text-base flex flex-col gap-y-6">
				<div className="flex flex-col gap-y-2">
					<dt className="font-semibold leading-[130%]">Заказчик</dt>
					<dd className="leading-[140%]">{task.creator}</dd>
				</div>

				<div className="flex flex-col gap-y-2 md:hidden">
					<dt className="font-semibold leading-[130%]">Описание услуги</dt>
					<dd className="leading-[140%]">
						<p className="break-all">{task.description}</p>
					</dd>
				</div>

				<div className="flex items-end gap-x-5 justify-between">
					<div className="flex flex-col gap-y-2 max-md:hidden">
						<dt className="font-semibold leading-[130%]">Описание услуги</dt>
						<dd className="leading-[140%]">
							<p className="max-w-[600px]">{task.description}</p>
						</dd>
					</div>

					{type === "reply" && (
						<ReplyToTask
							className="max-md:hidden"
							taskId={task.id}
							price={task.price}
						/>
					)}
					{type === "message" && (
						<Button variant="outline" className="max-md:hidden text-secondary-foreground">
							Перейти в чат
						</Button>
					)}
				</div>
			</dl>

			{type === "reply" && (
				<ReplyToTask
					className="md:hidden"
					taskId={task.id}
					price={task.price}
				/>
			)}
			{type === "message" && (
				<Button variant="outline" className="md:hidden text-secondary-foreground">
					Перейти в чат
				</Button>
			)}
		</div>
	);
};
