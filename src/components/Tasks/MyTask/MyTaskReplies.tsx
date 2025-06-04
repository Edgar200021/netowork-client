import { Loader } from "@/components/ui/loader";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetMyTaskRepliesQuery } from "@/store/tasks/taskApi";
import { Task } from "@/types/task";
import { TaskReply } from './TaskReply';

interface Props {
	taskId: Task["id"];
	className?: string;
	listClassName?: string;
}

export const MyTaskReplies = ({ className, taskId, listClassName }: Props) => {
	const { isLoading, data, error } = useGetMyTaskRepliesQuery({ taskId });
	useHandleError(error);

	if (isLoading) return <Loader size="sm" />;
	if (!data || error) return null;

	if (!data.data.replies.length)
		return (
			<div className={cn("max-w-[578px]", className)}>
				<p className="font-semibold text-xl mb-4">
					У задания пока нет откликов
				</p>
				<p className="text-bas text-secondary-foreground ">
					Скоро здесь появятся отклики исполнителей, готовых выполнить ваше
					задание. Это может занять время. Дождитесь, пока исполнители увидят
					задание и откликнутся на него
				</p>
			</div>
		);

	return (
		<ul className={cn("", listClassName)}>
			{data.data.replies.map(reply => <li key={reply.id}><TaskReply taskReply={reply}/></li>)}
		</ul>
	);
};
