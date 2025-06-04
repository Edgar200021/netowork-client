import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import { useCreateTaskReplyMutation } from "@/store/tasks/taskApi";
import { useHandleError } from "@/hooks/useHandleError";
import { Loader } from "../ui/loader";
import { FieldErrors } from "../FieldError";
import {
	createTaskReplySchema,
	CreateTaskReplySchema,
} from "@/schemas/tasks/createTaskReplySchema";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";

interface Props {
	taskId: Task["id"];
	price: Task["price"];
	className?: string;
}

export const ReplyToTask = ({ className, price, taskId }: Props) => {
	const [isOpened, setIsOpened] = useState(false);
	const [isDialogOpened, setIsDialogOpened] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("");
	const [createTaskReply, { isLoading, error, data }] =
		useCreateTaskReplyMutation();
	const { apiValidationErrors, setValidationError, clearError } =
		useHandleError<(keyof CreateTaskReplySchema)[]>(error);
	useHandleApiResponse(data, {
		toastText: "Отклик успешно отправлен",
		callback: () => {
			setIsOpened(false);
			setIsDialogOpened(false);
		},
	});

	useMediaQuery("(min-width: 768px)", () => {
		if (isOpened) {
			if (textAreaRef.current) {
				setText(textAreaRef.current.value);
			}
			setIsOpened(false);
			setIsDialogOpened(true);
		}
	});

	useMediaQuery("(max-width: 767px)", () => {
		if (isDialogOpened) {
			if (textAreaRef.current) {
				setText(textAreaRef.current.value);
			}
			setIsDialogOpened(false);
			setIsOpened(true);
		}
	});

	const onClick = async () => {
		clearError();
		const { error, data } = await createTaskReplySchema.safeParseAsync({
			description: textAreaRef.current?.value,
			taskId,
		});

		if (error) {
			for (const err of error.errors) {
				setValidationError(
					err.path[0] as keyof CreateTaskReplySchema,
					err.message,
				);
			}
			return;
		}

		createTaskReply(data);
	};

	return (
		<>
			<div className={cn("md:hidden", className)}>
				<Drawer open={isOpened} onOpenChange={setIsOpened}>
					<DrawerTrigger asChild className="md:hidden">
						<Button className="w-full">Откликнуться</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-white md:hidden">
						<DrawerHeader className="mb-5 px-[10px]">
							<DrawerDescription className="hidden">Reply</DrawerDescription>

							<DrawerTitle className="font-bold text-[22px] leading-[130%] text-center">
								Отклик на задание
							</DrawerTitle>
						</DrawerHeader>
						<DrawerFooter className="px-[10px] w-full">
							<dl className="mb-20">
								<div className="flex flex-col gap-y-2 mb-4">
									<dt className="leading-[140%]">Описание</dt>
									<dd className="leading-[140%] flex flex-col gap-y-4">
										<textarea
											defaultValue={text}
											placeholder="Укажите свой опыт работы, расскажите, почему именно вы должны стать исполнителем этого задания"
											className="w-full p-2 border-primary border-[1px] rounded-md placeholder:text-black resize-none"
											ref={textAreaRef}
											rows={6}
										/>
										{apiValidationErrors.description && (
											<FieldErrors error={apiValidationErrors.description} />
										)}
									</dd>
								</div>
								<div className="flex items-center gap-x-2 mb-6">
									<span className="text-primary">✓</span>
									<span className="leading-[130%]">Сделка без риска</span>
								</div>
								<dt className="leading-[130%]">Бюджет заказчика</dt>
								<dd className="leading-[140%] text-[22px]">до {price} руб.</dd>
							</dl>
							<Button disabled={isLoading} onClick={onClick}>
								{isLoading && <Loader size="sm" variant="secondary" />}
								Откликнуться
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={cn("max-md:hidden", className)}>
				<Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
					<DialogTrigger asChild className="max-md:hidden ">
						<Button className="">Откликнуться</Button>
					</DialogTrigger>
					<DialogContent className="bg-white max-md:hidden">
						<DialogHeader className="mb-8">
							<DialogDescription className="hidden">Filters</DialogDescription>
							<DialogTitle className="font-semibold text-[25px] leading-[130%] text-center ">
								Отклик на задание
							</DialogTitle>
						</DialogHeader>
						<DialogFooter className="px-[10px] flex !flex-col">
							<dl className="mb-8">
								<div className="flex flex-col gap-y-2 mb-4">
									<dt className="leading-[140%]">Описание</dt>
									<dd className="leading-[140%] flex flex-col gap-y-4">
										<textarea
											defaultValue={text}
											placeholder="Укажите свой опыт работы, расскажите, почему именно вы должны стать исполнителем этого задания"
											className="w-full p-2 border-primary border-[1px] rounded-md placeholder:text-black resize-none"
											ref={textAreaRef}
											rows={6}
										/>
										{apiValidationErrors?.description && (
											<FieldErrors error={apiValidationErrors.description} />
										)}
									</dd>
								</div>
								<div className="flex items-center gap-x-2 mb-6">
									<span className="text-primary">✓</span>
									<span className="leading-[130%]">Сделка без риска</span>
								</div>
								<dt className="leading-[130%]">Бюджет заказчика</dt>
								<dd className="leading-[140%] text-[22px]">до {price} руб.</dd>
							</dl>
							<Button disabled={isLoading} onClick={onClick}>
								{isLoading && <Loader size="sm" variant="secondary" />}
								Откликнуться
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
