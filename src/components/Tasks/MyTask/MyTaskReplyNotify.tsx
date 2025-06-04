import { Checkbox } from "@/components/ui/checkbox";
import { type Task, TaskStatus } from "@/types/task";
import type { User } from "@/types/user";
import { MyTaskDelete } from "./MyTaskDelete";
import { useUpdateMyTask } from "@/hooks/useUpdateMyTask";
import { useEffect, useRef, useState } from "react";

interface Props {
	userEmail: User["email"];
	taskId: Task["id"];
	status: Task["status"];
	notifyAboutReplies?: Task["notifyAboutReplies"];
}

export const MyTaskReplyNotify = ({
	userEmail,
	taskId,
	status,
	notifyAboutReplies,
}: Props) => {
	const [notify, setNotify] = useState(notifyAboutReplies ?? false);
	const { onSubmit, apiValidationErrors, isLoading } = useUpdateMyTask(
		{ taskId, notifyAboutReplies: notify },
		["notifyAboutReplies"],
	);
	const firstRender = useRef(true);

	console.log("API errors", apiValidationErrors);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		onSubmit();
	}, [notify]);

	return (
		<div className="flex flex-col gap-y-[38px] md:flex-row md:justify-between">
			<div className="flex items-center gap-x-4">
				<Checkbox
					disabled={isLoading}
					className="data-[state=checked]:text-white"
					onCheckedChange={(val) => {
						setNotify(val as boolean);
					}}
					checked={notify}
					defaultChecked={notify}
				/>
				<p className="text-sm">
					Уведомлять меня о новых откликах к заданию по e-mail: &nbsp;
					{userEmail}
				</p>
			</div>
			{status === TaskStatus.Open && <MyTaskDelete taskId={taskId} className='w-fit' />}
		</div>
	);
};
