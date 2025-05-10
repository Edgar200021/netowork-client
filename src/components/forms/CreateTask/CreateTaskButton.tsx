import { Button } from "@/components/ui/button";
import {
	FILES_MAX_SIZE,
	MAX_TASK_DESCRIPTION_LENGTH,
	MAX_TASK_TITLE_LENGTH,
	MIN_TASK_DESCRIPTION_LENGTH,
	MIN_TASK_TITLE_LENGTH,
	TASK_FILES_ALLOWED_TYPES,
} from "@/constants/const";
import type { CreateTaskSchema } from "@/schemas/tasks/createTaskSchema";
import { type Control, useWatch } from "react-hook-form";

interface Props {
	control: Control<CreateTaskSchema>;
	step: number;
	totalSteps: number;
	onStepChange: (step: number) => void;
	isLoading: boolean;
}

export const CreateTaskButton = ({
	control,
	step,
	totalSteps,
	onStepChange,
	isLoading,
}: Props) => {
	const { title, categoryId, subCategoryId, description, files, price } =
		useWatch({
			control,
		});

	let disabled = false;

	if (step === 1) {
		if (
			!title ||
			title.trim().length < MIN_TASK_TITLE_LENGTH ||
			title.trim().length > MAX_TASK_TITLE_LENGTH
		) {
			disabled = true;
		}

		if (!categoryId || !subCategoryId) {
			disabled = true;
		}
	}

	if (step === 2) {
		if (
			!description ||
			description?.trim().length < MIN_TASK_DESCRIPTION_LENGTH ||
			description?.trim().length > MAX_TASK_DESCRIPTION_LENGTH
		) {
			disabled = true;
		}

		if (
			files &&
			Array.from(files).some(
				(file) =>
					file.size > FILES_MAX_SIZE ||
					!TASK_FILES_ALLOWED_TYPES.includes(file.type),
			)
		) {
			disabled = true;
		}
	}

	if (step === totalSteps) {
		if (!Number(price)) {
			disabled = true;
		}
	}

	return (
		<div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-5">
			{step > 1 && (
				<Button
					type="button"
					disabled={step === 1 || isLoading}
					onClick={() => onStepChange(step - 1)}
					variant="secondary"
					className="w-full"
				>
					Назад
				</Button>
			)}
			<Button
				type={step < totalSteps ? "button" : "submit"}
				disabled={disabled || isLoading}
				onClick={() => onStepChange(step < totalSteps ? step + 1 : step)}
				className="w-full"
			>
				{step < totalSteps
					? "Далее"
					: isLoading
						? "Загрузка..."
						: "Опубликовать заказ"}
			</Button>
		</div>
	);
};
