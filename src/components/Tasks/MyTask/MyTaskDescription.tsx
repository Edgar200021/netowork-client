import { FieldErrors } from "@/components/FieldError";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	MAX_TASK_DESCRIPTION_LENGTH,
	MIN_TASK_DESCRIPTION_LENGTH,
} from "@/constants/const";
import { useUpdateMyTask } from "@/hooks/useUpdateMyTask";
import type { Task } from "@/types/task";
import { useState } from "react";
import sprites from "../../../assets/icons/sprites.svg";

interface Props {
	taskId: Task["id"];
	description: Task["description"];
}

export const MyTaskDescription = ({ description, taskId }: Props) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(description);

	const { onSubmit, apiValidationErrors, errors, isLoading } = useUpdateMyTask(
		{
			description: value,
			taskId,
		},
		["description"],
		value === description,
	);

	return (
		<div className="flex flex-col gap-y-2">
			<dt className="font-semibold text-xl leading-[130%] flex items-center gap-x- ">
				<span>Описание услуги</span>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary "
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle className="text-lg mb-2">Описание услуги</DialogTitle>
						<div className="flex items-center gap-x-5 justify-between mb-5">
							<div className="flex flex-col gap-y-4 w-full">
								<textarea
									value={value}
									onChange={(e) => setValue(e.target.value)}
									defaultValue={value}
									className="rounded-md p-2 resize-none border-[1px] border-primary"
									minLength={MIN_TASK_DESCRIPTION_LENGTH}
									maxLength={MAX_TASK_DESCRIPTION_LENGTH}
									rows={10}
								/>

								{(apiValidationErrors?.description || errors.description) && (
									<FieldErrors
										error={
											apiValidationErrors?.description || errors.description!
										}
									/>
								)}
							</div>
						</div>
						<Button onClick={onSubmit} disabled={isLoading}>
							Изменить описание
						</Button>
					</DialogContent>
				</Dialog>
			</dt>
			<dd className="leading-[140%] break-words">{description}</dd>
		</div>
	);
};
