import { Checkbox } from "@/components/ui/checkbox";
import { Task, TaskStatus } from "@/types/task";
import { User } from "@/types/user";
import { MyTaskDelete } from "./MyTaskDelete";

interface Props {
	userEmail: User["email"];
	taskId: Task["id"];
	status: Task["status"];
}

export const MyTaskReplyNotify = ({ userEmail, taskId, status }: Props) => {
	return (
		<div className="flex flex-col gap-y-[38px] md:flex-row md:justify-between">
			<div className="flex items-center gap-x-4">
				<Checkbox />
				<p className="text-sm">
					Уведомлять меня о новых откликах к заданию по e-mail: &nbsp;
					{userEmail}
				</p>
			</div>
			{status === TaskStatus.Open && <MyTaskDelete taskId={taskId} />}
		</div>
	);
};
