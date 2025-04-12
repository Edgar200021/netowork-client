import {
	FILES_MAX_SIZE,
	MAX_WORK_TITLE_LENGTH,
	MIN_WORK_TITLE_LENGTH,
	WORK_IMAGES_MAX_COUNT,
} from "@/constants/const";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sprites from "../../assets/icons/sprites.svg";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";

interface Props {
	className?: string;
}

export const AddWork = ({ className }: Props) => {
	const fileRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<
		{ id: string; file: File; imgUrl: string }[]
	>([]);
	const [open, setOpen] = useState(false);

	const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
		const currentFiles = Array.from(e.target.files || []);
		if (currentFiles.length === 0 || files.length >= WORK_IMAGES_MAX_COUNT)
			return;

		const remainingCount = WORK_IMAGES_MAX_COUNT - files.length;

		setFiles((prev) => [
			...prev,
			...currentFiles
				.slice(0, remainingCount)
				.filter((file) => file.size < FILES_MAX_SIZE)
				.map((file) => ({
					id: uuidv4(),
					file,
					imgUrl: URL.createObjectURL(file),
				})),
		]);
	};

	useEffect(() => {
		if (files.length === 0) return;

		return () => {
			for (const { imgUrl } of files) {
				URL.revokeObjectURL(imgUrl);
			}
		};
	}, []);

	const onClose = () => {
		setOpen(false);
		for (const { imgUrl } of files) {
			URL.revokeObjectURL(imgUrl);
		}
		setFiles([]);
	};

	return (
		<>
			<Drawer open={open} onOpenChange={setOpen} onClose={onClose}>
				<DrawerTrigger asChild>
					<div className="max-w-[276px] !min-w-[250px] w-full rounded-2xl bg-white overflow-hidden relative  cursor-pointer min-h-[306px] flex items-center justify-center flex-col gap-y-4 border-[2px] border-dashed border-border">
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary text-primary"
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#plus`} />
							</svg>
						</Button>
						<p className="font-semibold text-base max-w-[148px] text-center">
							Добавить работу в портфолио
						</p>
					</div>
				</DrawerTrigger>
				<DrawerContent className="bg-white">
					<DrawerHeader className="mb-5 px-[10px]">
						<DialogDescription className="hidden">
							Adding works
						</DialogDescription>

						<DialogTitle className="font-bold text-[22px] leading-[130%] text-center">
							Добавить работы в портфолио
						</DialogTitle>
					</DrawerHeader>
					<div className="px-[10px] flex flex-col gap-y-1">
						{files.length > 0 && (
							<ul className="mb-2 grid grid-cols-2 gap-x-2 gap-y-2 justify-items-center">
								{files.map((file) => (
									<li
										key={file.id}
										className="rounded-2xl max-w-[200px] w-full h-[165px] overflow-hidden flex items-center justify-center relative "
									>
										<img
											className="w-full h-[100%] object-cover absolute left-0 top-0 "
											src={file.imgUrl}
											alt={file.file.name}
										/>
										<Button
											variant={"ghost"}
											className="!w-[44px] !h-[44px] rounded-full bg-white z-10"
										/>
									</li>
								))}
							</ul>
						)}
						<div
							role="button"
							onClick={() => {
								if (files.length >= WORK_IMAGES_MAX_COUNT) return;
								fileRef.current?.click();
							}}
							className="border-[1px] border-dashed border-border flex flex-col  items-center justify-center gap-y-6 bg-secondary/50 py-8 cursor-pointer rounded-2xl "
						>
							<div className="size-12 rounded-full bg-primary flex items-center justify-center relative">
								<span className="font-bold text-white text-2xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%]">
									&uarr;
								</span>
								<span className="w-5 h-3 block rounded-[5px] bg-secondary/30 mt-2" />
							</div>
							<Button
								className={cn("bg-white text-primary-foreground shadow-none", {
									"bg-gray-400 hover:bg-gray-400":
										files.length >= WORK_IMAGES_MAX_COUNT,
									"hover:bg-white": files.length < WORK_IMAGES_MAX_COUNT,
								})}
							>
								Выберите файл
							</Button>
						</div>
						<Input
							multiple
							accept="image/avif,image/bmp,image/jpg,image/jpeg,image/png,image/webp"
							maxLength={WORK_IMAGES_MAX_COUNT}
							ref={fileRef}
							type="file"
							className="hidden"
							onChange={onSelectFile}
						/>
						{/*{apiValidationErrors?.aboutMe && (
							<FieldErrors error={apiValidationErrors.aboutMe} />
						)}*/}
					</div>
					{files.length > 0 && (
						<DrawerFooter className="px-[10px]">
							<div className="flex flex-col gap-y-2 mb-3">
								<label
									htmlFor="description"
									className="text-secondary-foreground leading-[140%]"
								>
									Описание вашей работы
								</label>
								<Input
									min={MIN_WORK_TITLE_LENGTH}
									max={MAX_WORK_TITLE_LENGTH}
									required
									type="text"
									id="description"
								/>
							</div>
							<div className="flex items-center justify-between gap-x-2">
								<Button onClick={onClose} variant="outline" className="w-1/2">
									Вернуться назад
								</Button>
								<Button className="w-1/2">Продолжить</Button>
							</div>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};
