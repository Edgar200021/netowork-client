import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	MAX_WORK_TITLE_LENGTH,
	MIN_WORK_TITLE_LENGTH,
} from "@/constants/const";
import { useHandleError } from "@/hooks/useHandleError";
import { workActions, workSlice } from "@/store/portfolio/workSlice";
import { useCreateWorkMutation } from "@/store/portfolio/worksApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { memo } from "react";

export const AddWorkFooter = () => {
	const showTitle = useAppSelector(workSlice.selectors.getShowTitle);
	const title = useAppSelector(workSlice.selectors.getTitle);
	const dispatch = useAppDispatch();

	if (!showTitle) return null;

	return (
		<div className="flex flex-col gap-y-2 w-full">
			<div className="flex flex-col gap-y-2 mb-3">
				<label
					htmlFor="description"
					className="text-secondary-foreground leading-[140%]"
				>
					Описание вашей работы
				</label>
				<Input
					value={title}
					onChange={(e) => dispatch(workSlice.actions.setTitle(e.target.value))}
					min={MIN_WORK_TITLE_LENGTH}
					max={MAX_WORK_TITLE_LENGTH}
					required
					type="text"
					id="description"
				/>
			</div>
			<SubmitAddWork />
		</div>
	);
};

const SubmitAddWork = memo(() => {
	const [createWork, { isLoading, error }] = useCreateWorkMutation();
	const dispatch = useAppDispatch();
	const { handleError } = useHandleError(error, true);
	const title = useAppSelector(workSlice.selectors.getTitle);
	const files = useAppSelector(workSlice.selectors.getFiles);

	const clearAndClose = () => {
		dispatch(workSlice.actions.clearState());
		dispatch(workActions.setIsOpened(false));
		dispatch(workActions.setIsDialogOpened(false));
	};
	const onSubmit = async () => {
		try {
			await createWork({
				title,
				images: files.map((f) => f.file),
			}).unwrap();
			clearAndClose();
		} catch (e) {
			handleError(e);
		}
	};

	return (
		<div className="flex items-center justify-between gap-x-2">
			<Button
				disabled={isLoading}
				onClick={clearAndClose}
				variant="outline"
				className="w-1/2"
			>
				Вернуться назад
			</Button>
			<Button
				onClick={onSubmit}
				disabled={
					isLoading ||
					!title ||
					title.length < MIN_WORK_TITLE_LENGTH ||
					title.length > MAX_WORK_TITLE_LENGTH ||
					files.length === 0
				}
				className="w-1/2"
			>
				{isLoading ? "Загрузка..." : "Продолжить"}
			</Button>
		</div>
	);
});
