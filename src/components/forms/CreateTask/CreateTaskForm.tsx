import { FieldErrors } from "@/components/FieldError";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	type CreateTaskSchema,
	createTaskSchema,
} from "@/schemas/tasks/createTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Steps } from "@/components/ui/steps";
import {
	FILES_MAX_SIZE,
	MAX_TASK_DESCRIPTION_LENGTH,
	MAX_TASK_TITLE_LENGTH,
	MIN_TASK_DESCRIPTION_LENGTH,
	MIN_TASK_TITLE_LENGTH,
	TASK_FILES_ALLOWED_TYPES,
	TASK_FILES_MAX_COUNT,
} from "@/constants/const";
import { useHandleError } from "@/hooks/useHandleError";
import { useGetCategoriesQuery } from "@/store/category/categoryApi";
import { useCreateTaskMutation } from "@/store/tasks/taskApi";
import { useEffect, useMemo, useRef, useState } from "react";
import sprites from "../../../assets/icons/sprites.svg";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { CreateTaskButton } from "./CreateTaskButton";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";

interface Props {
	className?: string;
}

export const CreateTaskForm = ({ className }: Props) => {
	const {
		register,
		formState: { errors },
		getValues,
		setValue,
		handleSubmit,
		control,
		watch,
	} = useForm<CreateTaskSchema>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			files: [],
		},
	});
	const [step, setStep] = useState(1);
	const { data, isLoading, error, isError } = useGetCategoriesQuery(null);
	const [
		createTask,
		{ isLoading: isLoadingCreateTask, error: errorCreateTask },
	] = useCreateTaskMutation();
	const fileRef = useRef<HTMLInputElement>(null);

	useHandleError(error);
	const { apiValidationErrors, handleError } = useHandleError<
		(keyof Omit<CreateTaskSchema, "files">)[]
	>(errorCreateTask, true);

	useEffect(() => {
		if (!apiValidationErrors) {
			return;
		}

		if (
			apiValidationErrors.title ||
			apiValidationErrors.categoryId ||
			apiValidationErrors.subCategoryId
		) {
			setStep(1);
		}

		if (apiValidationErrors.description) {
			setStep(2);
		}

		if (apiValidationErrors.price) {
			setStep(3);
		}
	}, [apiValidationErrors]);

	const categoryId = watch("categoryId");
	const files = watch("files");
	const navigate = useNavigate();

	const category = useMemo(
		() => data?.data.find((category) => category.id === categoryId),
		[categoryId, data?.data],
	);
	const totalSteps = 3;

	const onSubmit = async (data: CreateTaskSchema) => {
		try {
			await createTask(data).unwrap();
			navigate(ROUTES.myTasks);
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn(className, "max-w-[720px] w-full mx-auto ")}
		>
			<fieldset
				disabled={isLoading || isError || isLoadingCreateTask}
				className="m-0 p-0"
			>
				<h1
					className={cn(
						"font-bold text-[32px] leading-[120%] md:text-[48px] text-center mb-10",
						className,
					)}
				>
					{step === 1
						? "Поможем найти исполнителя для вашего задания"
						: `Ищем исполнителя для задания “${getValues("title")}”`}
				</h1>
				<div className="max-w-[600px] mx-auto w-full bg-white pb-8 rounded-b-md">
					<div className={cn("flex flex-col gap-y-8 mb-8", className)}>
						<Steps
							className="bg-background"
							step={step}
							totalSteps={totalSteps}
						/>
						<h2 className="text-center font-semibold text-[25px]">
							{step === 1
								? "Что нужно сделать?"
								: step === 2
									? "Уточнить детали"
									: "На какой бюджет вы расчитываете"}
						</h2>
					</div>
					<div className="px-5 ">
						{step === 1 && (
							<>
								<label className={cn(className, "flex flex-col gap-y-2 mb-5")}>
									<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm">
										Название задания
									</span>
									<Input
										{...register("title")}
										minLength={MIN_TASK_TITLE_LENGTH}
										maxLength={MAX_TASK_TITLE_LENGTH}
										className="py-5"
										required
									/>
									{(errors.title?.message || apiValidationErrors?.title) && (
										<FieldErrors
											error={
												errors.title?.message || apiValidationErrors!.title!
											}
										/>
									)}
								</label>
								<div
									className={cn(
										className,
										"flex justify-between gap-x-5 mb-10",
									)}
								>
									<label className="flex flex-col gap-y-2 mb-5 w-1/2">
										<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm">
											Категории услуг
										</span>
										<Controller
											control={control}
											name="categoryId"
											render={({ field }) => (
												<Select
													onValueChange={(val) => {
														field.onChange(Number(val));
														setValue("subCategoryId", 0);
													}}
													value={String(field.value)}
													required
													disabled={isLoading || isError || !data}
												>
													<SelectTrigger className="py-5">
														<SelectValue />
													</SelectTrigger>
													<SelectContent className="min-w-0">
														{data?.data.map((category) => (
															<SelectItem
																key={category.id}
																value={String(category.id)}
															>
																{category.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>

										{(errors.categoryId?.message ||
											apiValidationErrors?.categoryId) && (
											<FieldErrors
												error={
													errors.categoryId?.message ||
													apiValidationErrors!.categoryId!
												}
											/>
										)}
									</label>
									<label className="flex flex-col gap-y-2 mb-5 w-1/2">
										<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm text-nowrap">
											Подкатегории услуги
										</span>
										<Controller
											control={control}
											name="subCategoryId"
											render={({ field }) => (
												<Select
													onValueChange={(val) => field.onChange(Number(val))}
													value={String(field.value)}
													required
													disabled={isLoading || isError || !data || !category}
												>
													<SelectTrigger className="py-5">
														<SelectValue />
													</SelectTrigger>
													<SelectContent className="min-w-0">
														{category?.subCategories.map((subCategory) => (
															<SelectItem
																key={subCategory.id}
																value={String(subCategory.id)}
															>
																{subCategory.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											)}
										/>

										{(errors.subCategoryId?.message ||
											apiValidationErrors?.subCategoryId) && (
											<FieldErrors
												error={
													errors.subCategoryId?.message ||
													apiValidationErrors!.subCategoryId!
												}
											/>
										)}
									</label>
								</div>
							</>
						)}
						{step === 2 && (
							<>
								<label className={cn(className, "flex flex-col gap-y-2 mb-5")}>
									<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm">
										Описание
									</span>
									<textarea
										className="border-[2px] border-primary rounded-md resize-none p-2"
										{...register("description")}
										minLength={MIN_TASK_DESCRIPTION_LENGTH}
										maxLength={MAX_TASK_DESCRIPTION_LENGTH}
										rows={3}
									/>
									{(errors.description?.message ||
										apiValidationErrors?.description) && (
										<FieldErrors
											error={
												errors.description?.message ||
												apiValidationErrors!.description!
											}
										/>
									)}
								</label>
								<div className={cn(className, "flex flex-col gap-y-4 mb-5")}>
									<div className="flex flex-col gap-y-2 px-2">
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
												disabled={files!.length === TASK_FILES_MAX_COUNT}
												type="button"
												className={
													"bg-white text-primary-foreground shadow-none sm:font-semibold sm:text-lg"
												}
											>
												Выберите файл (Максимальный размер:{" "}
												{FILES_MAX_SIZE / (1024 * 1024)} МБ)
											</Button>
										</div>
										<Controller
											name="files"
											control={control}
											render={({ field }) => (
												<Input
													disabled={files!.length === TASK_FILES_MAX_COUNT}
													accept={TASK_FILES_ALLOWED_TYPES.join(", ")}
													ref={fileRef}
													type="file"
													className="hidden"
													onChange={(e) => {
														const f = e.target.files;
														if (!f) return;
														if (files!.length === TASK_FILES_MAX_COUNT) return;

														const fileArray = Array.from(f).slice(
															0,
															TASK_FILES_MAX_COUNT - files!.length,
														);

														if (!files!.length)
															return field.onChange(fileArray);

														field.onChange([
															...files!,
															...fileArray.filter((f) => {
																for (const file of files!) {
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
														]);
													}}
													multiple
													maxLength={TASK_FILES_MAX_COUNT - files!.length}
												/>
											)}
										/>
									</div>
									{errors.files?.message && (
										<FieldErrors error={errors.files.message} />
									)}
									{files!.length > 0 && (
										<ul className="flex flex-col gap-y-4">
											{files!.map((file) => (
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
															setValue(
																"files",
																files!.filter((f) => f !== file),
															);
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
								</div>
							</>
						)}
						{step === totalSteps && (
							<label
								className={cn(className, "flex flex-col gap-y-2 mb-5 relative")}
							>
								<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm">
									Стоимость
								</span>
								<Input
									{...register("price")}
									className="py-5 pr-20"
									required
									type="number"
								/>
								{(errors.price?.message || apiValidationErrors?.price) && (
									<FieldErrors
										error={errors.price?.message || apiValidationErrors!.price!}
									/>
								)}
							</label>
						)}

						<CreateTaskButton
							control={control}
							step={step}
							totalSteps={totalSteps}
							onStepChange={setStep}
							isLoading={isLoading || isLoadingCreateTask}
						/>
					</div>
				</div>
			</fieldset>
		</form>
	);
};
