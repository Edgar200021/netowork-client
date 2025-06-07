import { cn } from "@/lib/utils";
import { TaskReply as TTaskReply } from "@/types/task";
import defaultProfile from "../../../assets/icons/default-profile.svg";
import { Button } from "@/components/ui/button";

interface Props {
	taskReply: TTaskReply;
	className?: string;
}

export const TaskReply = ({ className, taskReply }: Props) => {
	const date = new Date(taskReply.createdAt);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	const formattedDate = `${day}.${month}.${year} г.`;

	return (
		<div
			className={cn(
				"px-[10px] py-4 rounded-[16px] border-[1px] border-border flex flex-col gap-y-6 w-full md:px-6 md:py-[38px] relative",
				className,
			)}
		>
			<div className="flex items-center gap-x-2">
				<img
					className="w-[50px] h-[50px] object-cover"
					src={taskReply.freelancer.avatar || defaultProfile}
					alt={taskReply.freelancer.firstName}
				/>
				<div className="flex flex-col gap-y-1">
					<div className="div flex gap-x-2 items-center">
						<span className="font-semibold">
							{taskReply.freelancer.firstName} {taskReply.freelancer.lastName}
						</span>
						<span className="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
							&#10003;
						</span>
					</div>
					<span className="text-secondary-foreground text-sm">
						{formattedDate}
					</span>
				</div>
			</div>
			<p className="text-base  leading-[140%]">{taskReply.description}</p>
			<Button
				className="md:absolute md:top-[38px] md:right-8"
				variant="outline"
			>
				Обсудить условия
			</Button>
		</div>
	);
};
