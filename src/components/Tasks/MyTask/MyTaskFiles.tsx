import { FieldErrors } from "@/components/FieldError";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	FILES_MAX_SIZE,
	TASK_FILES_ALLOWED_TYPES,
	TASK_FILES_MAX_COUNT,
} from "@/constants/const";
import { useHandleError } from "@/hooks/useHandleError";
import { useUpdateMyTask } from "@/hooks/useUpdateMyTask";
import {
	deleteTaskFilesSchema,
	DeleteTaskFilesSchema,
} from "@/schemas/tasks/deleteTaskFilesSchema";
import { useDeleteTaskFilesMutation } from "@/store/tasks/taskApi";
import { Task } from "@/types/task";
import { useRef, useState } from "react";
import sprites from "../../../assets/icons/sprites.svg";

interface Props {
	taskId: Task["id"];
	files: Task["files"];
}

export const MyTaskFiles = ({ taskId, files }: Props) => {
	const [open, setOpen] = useState(false);
	const [newFiles, setNewFiles] = useState<File[]>([]);
	const fileRef = useRef<HTMLInputElement>(null);

	const { onSubmit, isLoading, errors } = useUpdateMyTask(
		{
			files: newFiles,
			taskId,
		},
		["files"],
		newFiles.length === 0 ||
			newFiles.length > TASK_FILES_MAX_COUNT - files.length,
	);
	const [deleteTaskFiles, { isLoading: isDeleting, error }] =
		useDeleteTaskFilesMutation();
	const { apiValidationErrors } =
		useHandleError<(keyof DeleteTaskFilesSchema)[]>(error);
	const [deleteFileErrors, setDeleteFileErrors] = useState<
		Partial<Record<keyof DeleteTaskFilesSchema, string>>
	>({});

	const onDeleteFile = async (fileId: string) => {
		const data = {
			taskId,
			fileId,
		};

		const { success, error } = await deleteTaskFilesSchema.safeParseAsync(data);
		if (!success) {
			for (const err of error.errors) {
				setDeleteFileErrors((prev) => ({
					...prev,
					[err.path[0]]: err.message,
				}));
			}
			return;
		}

		setDeleteFileErrors({});

		await deleteTaskFiles(data).unwrap();
	};

	return (
		<div className="flex flex-col gap-y-2">
			<dt className="font-semibold text-xl leading-[130%] flex items-center gap-x- ">
				<span>Файлы</span>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							disabled={files.length === TASK_FILES_MAX_COUNT}
							className="w-[44px] h-[44px] rounded-full bg-secondary "
							variant="ghost"
							title={
								files.length === TASK_FILES_MAX_COUNT
									? "Удалите один файл чтобы продолжить"
									: ""
							}
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle className="text-lg mb-2">Обновите файлы</DialogTitle>
						<div
							role="button"
							onClick={() => {
								fileRef.current?.click();
							}}
							className="border-[1px] border-dashed border-border flex flex-col px-4  items-center justify-center gap-y-6 sm:gap-y-3 bg-[#fbfbfb] py-8 cursor-pointer rounded-2xl"
						>
							<p className="max-w-[220px] hidden sm:block text-center">
								Перетащите файл в эту область, чтобы загрузить
							</p>
							<div className="size-12 rounded-full bg-primary flex items-center justify-center relative">
								<span className="font-bold text-white text-2xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%]">
									&uarr;
								</span>
								<span className="w-5 h-3 block rounded-[5px] bg-secondary/30 mt-2" />
							</div>
							<span className="hidden sm:block text-secondary-foreground">
								или
							</span>
							<Button
								disabled={files.length === TASK_FILES_MAX_COUNT}
								type="button"
								className={
									"bg-white text-primary-foreground shadow-none sm:font-semibold sm:text-lg"
								}
							>
								Выберите файл (Максимальный размер:{" "}
								{FILES_MAX_SIZE / (1024 * 1024)} МБ)
							</Button>
						</div>
						<Input
							disabled={newFiles.length === TASK_FILES_MAX_COUNT - files.length}
							accept={TASK_FILES_ALLOWED_TYPES.join(", ")}
							ref={fileRef}
							type="file"
							className="hidden"
							onChange={(e) => {
								const f = e.target.files;
								if (
									newFiles.length === TASK_FILES_MAX_COUNT - files.length ||
									!f
								)
									return;

								const fileArray = Array.from(f).slice(
									0,
									TASK_FILES_MAX_COUNT - files.length - newFiles.length,
								);

								setNewFiles((prev) => {
									if (!prev.length) return fileArray;

									return [
										...prev,
										...fileArray.filter((f) => {
											for (const file of prev) {
												if (
													JSON.stringify({
														lastModified: f.lastModified,
														name: f.name,
														size: f.size,
														type: f.type,
													}) ===
													JSON.stringify({
														lastModified: file.lastModified,
														name: file.name,
														size: file.size,
														type: file.type,
													})
												) {
													return false;
												}
											}

											return true;
										}),
									];
								});
							}}
							multiple
							maxLength={TASK_FILES_MAX_COUNT - files.length - newFiles.length}
						/>

						{newFiles.length > 0 && (
							<ul className="flex flex-col gap-y-0 mb-2">
								{newFiles.map((file) => (
									<li
										key={file.lastModified}
										className="flex gap-x-5 items-center p-4 rounded-md bg-[#fbfbfb]"
									>
										<svg className="text-primary w-6 h-6 flex-shrink-0">
											<use xlinkHref={`${sprites}#file`} />
										</svg>

										<span className="font-semibold leading-[130%]">
											{file.name.slice(0, 40)}{" "}
											{file.name.length > 40 ? "..." : ""}
										</span>
										<Button
											onClick={() => {
												setNewFiles((prev) => prev.filter((f) => f !== file));
											}}
											variant="ghost"
											className="ml-auto"
										>
											<svg className="text-black w-6 h-6 flex-shrink-0">
												<use xlinkHref={`${sprites}#garbage`} />
											</svg>
										</Button>
									</li>
								))}
							</ul>
						)}
						{errors.files && <FieldErrors error={errors.files} />}
						<Button
							onClick={onSubmit}
							disabled={
								newFiles.length === 0 ||
								newFiles.length > TASK_FILES_MAX_COUNT - files.length ||
								isLoading ||
								isDeleting
							}
						>
							Загрузить файлы
						</Button>
					</DialogContent>
				</Dialog>
			</dt>
			<dd className="leading-[140%]">
				<ul className="flex flex-col gap-y-3 mb-2">
					{files.map((file) => (
						<li
							className="flex gap-x-5 items-center px-4 py-2 rounded-md bg-gray-300/40 relative"
							key={file.fileId}
						>
							<a
								className="absolute left-0 top-0 w-full h-full"
								href={file.fileUrl}
								download
							/>
							<svg className="text-primary w-6 h-6 flex-shrink-0">
								<use xlinkHref={`${sprites}#file`} />
							</svg>

							<span className="font-semibold leading-[130%]">
								{file.fileName.slice(0, 40)}{" "}
								{file.fileName.length > 40 ? "..." : ""}
							</span>

							<Button
								onClick={() => onDeleteFile(file.fileId)}
								disabled={isLoading || isDeleting}
								variant="ghost"
								className="ml-auto z-10 relative"
							>
								<svg className="text-black w-6 h-6 flex-shrink-0">
									<use xlinkHref={`${sprites}#garbage`} />
								</svg>
							</Button>
						</li>
					))}
				</ul>
				{(apiValidationErrors?.fileId ||
					apiValidationErrors?.taskId ||
					deleteFileErrors.fileId ||
					deleteFileErrors.taskId) && (
					<FieldErrors
						error={
							apiValidationErrors?.fileId ||
							apiValidationErrors?.taskId ||
							deleteFileErrors?.fileId ||
							deleteFileErrors!.taskId!
						}
					/>
				)}
			</dd>
		</div>
	);
};
