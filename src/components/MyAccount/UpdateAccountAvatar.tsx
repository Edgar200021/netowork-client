import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { Button } from "@/components/ui/button.tsx";
import sprites from "@/assets/icons/sprites.svg";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { cn } from "@/lib/utils.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useUpdateProfileMutation } from "@/store/user/userApi.ts";
import { useHandleError } from "@/hooks/useHandleError.ts";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse.ts";
import { FieldErrors } from "@/components/FieldError.tsx";

interface Props {
	className?: string;
}

export const UpdateAccountAvatar = ({ className }: Props) => {
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<{ file: File; imgUrl: string }>();
	const [open, setOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [updateAvatar, { isLoading, data, error }] = useUpdateProfileMutation();

	const { apiValidationErrors } = useHandleError<["avatar"]>(error);
	useHandleApiResponse(data, {
		showToast: false,
		callback: () => {
			if (file) {
				URL.revokeObjectURL(file.imgUrl);
			}
			setFile(undefined);
			setOpen(false);
			setDialogOpen(false);
		},
	});

	useEffect(() => {
		return () => {
			if (file) {
				setFile(undefined);
			}
		};
	}, []);

	const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f) return;

		if (file) {
			URL.revokeObjectURL(file.imgUrl);
		}

		setFile({
			file: f,
			imgUrl: URL.createObjectURL(f),
		});
	};

	const onUpdateAvatar = async () => {
		if (!file) return;
		updateAvatar({
			avatar: file.file,
		});
	};
	const onClose = () => {
		if (file) {
			return setFile(undefined);
		}

		setOpen(false);
	};

	return (
		<>
			<div className={cn("sm:hidden", className)}>
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-primary text-white flex items-center justify-center"
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-white">
						<DrawerHeader className="mb-3 px-[10px]">
							<div className="flex items-center flex-col gap-y-2 justify-between">
								<DialogTitle className="font-bold text-[22px] leading-[130%]">
									{!file
										? "Загрузка новой фотографии"
										: "Фотография на вашей странице"}
								</DialogTitle>
								<DialogDescription className="text-start text-base leading-[140%] text-primary-foreground text-center">
									{!file
										? "Загрузите свою настоящую фотографию. Вы можете выбрать изображение в формате JPG, WEBP или PNG."
										: "Выбранная область будет показываться на вашей странице."}{" "}
								</DialogDescription>
							</div>
						</DrawerHeader>
						{!file && (
							<div className="flex flex-col gap-y-2 mb-10 px-2">
								<div
									role="button"
									onClick={() => {
										fileRef.current?.click();
									}}
									className="border-[1px] border-dashed border-border flex flex-col px-4  items-center justify-center gap-y-6 sm:gap-y-3 bg-secondary/50 py-8 cursor-pointer rounded-2xl "
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
										className={
											"bg-white text-primary-foreground shadow-none sm:font-semibold sm:text-lg"
										}
									>
										Выберите файл
									</Button>
								</div>
								<Input
									accept="image/avif,image/bmp,image/jpg,image/jpeg,image/png,image/webp"
									ref={fileRef}
									type="file"
									className="hidden"
									onChange={onSelectFile}
								/>
								<p className="text-xs leading-[140%] text-center text-primary-foreground">
									Если у вас возникают проблемы с загрузкой, попробуйте выбрать
									фотографию меньшего размера.
								</p>
							</div>
						)}

						{file && (
							<div className="flex flex-col gap-y-5 px-2 max-w-[340px] mx-auto ">
								<div className="w-full h-[340px] relative after:content-[''] after:block after:absolute after:w-[250px] after:h-[250px] after:top-5 after:left-[50%] after:translate-x-[-50%] after:bg-white/50 after:rounded-full">
									<img
										src={file.imgUrl}
										alt={file.file.name}
										className="w-full h-full object-cover"
									/>
								</div>
								{apiValidationErrors.avatar && (
									<FieldErrors error={apiValidationErrors.avatar} />
								)}
							</div>
						)}

						{file && (
							<DrawerFooter className="px-[10px]">
								<div className="flex items-center justify-between gap-x-2">
									<Button
										disabled={isLoading}
										onClick={onClose}
										variant="outline"
										className="w-1/2"
									>
										Вернуться назад
									</Button>
									<Button
										onClick={onUpdateAvatar}
										disabled={isLoading}
										className="w-1/2"
									>
										Сохранить
									</Button>
								</div>
							</DrawerFooter>
						)}
					</DrawerContent>
				</Drawer>
			</div>
			<div className={cn("hidden sm:block", className)}>
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-primary text-white flex items-center justify-center"
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DialogTrigger>
					<DialogContent
						aria-describedby="about-me"
						hideCloseButton={true}
						className="bg-white"
					>
						<DialogHeader className="flex items-center flex-col gap-y-2 justify-between">
							<DialogTitle className="font-semibold text-[25px] leading-[130%] text-center">
								{!file
									? "Загрузка новой фотографии"
									: "Фотография на вашей странице"}{" "}
							</DialogTitle>

							<DialogDescription className="text-base leading-[140%] text-primary-foreground text-center">
								{!file
									? "Загрузите свою настоящую фотографию. Вы можете выбрать изображение в формате JPG, WEBP или PNG."
									: "Выбранная область будет показываться на вашей странице."}{" "}
							</DialogDescription>
						</DialogHeader>

						{!file && (
							<div className="flex flex-col gap-y-2 mb-10 px-2">
								<div
									role="button"
									onClick={() => {
										fileRef.current?.click();
									}}
									className="border-[1px] border-dashed border-border flex flex-col px-4  items-center justify-center gap-y-6 sm:gap-y-3 bg-secondary/50 py-8 cursor-pointer rounded-2xl "
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
										className={
											"bg-white text-primary-foreground shadow-none sm:font-semibold sm:text-lg"
										}
									>
										Выберите файл
									</Button>
								</div>
								<Input
									accept="image/avif,image/bmp,image/jpg,image/jpeg,image/png,image/webp"
									ref={fileRef}
									type="file"
									className="hidden"
									onChange={onSelectFile}
								/>
								<p className="text-xs leading-[140%] text-center text-primary-foreground">
									Если у вас возникают проблемы с загрузкой, попробуйте выбрать
									фотографию меньшего размера.
								</p>
							</div>
						)}

						{file && (
							<div className="flex flex-col gap-y-5 px-2 max-w-[340px] mx-auto ">
								<div className="w-full h-[340px] relative after:content-[''] after:block after:absolute after:w-[250px] after:h-[250px] after:top-5 after:left-[50%] after:translate-x-[-50%] after:bg-white/50 after:rounded-full">
									<img
										src={file.imgUrl}
										alt={file.file.name}
										className="w-full h-full object-cover"
									/>
								</div>
								{apiValidationErrors.avatar && (
									<FieldErrors error={apiValidationErrors.avatar} />
								)}
							</div>
						)}

						{file && (
							<DialogFooter>
								<div className="flex items-center justify-between gap-x-2 w-full">
									<Button
										disabled={isLoading}
										onClick={onClose}
										variant="outline"
										className="w-1/2"
									>
										Вернуться назад
									</Button>
									<Button
										onClick={onUpdateAvatar}
										disabled={isLoading}
										className="w-1/2"
									>
										Сохранить
									</Button>
								</div>
							</DialogFooter>
						)}
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
