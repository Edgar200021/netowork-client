import { cn } from "@/lib/utils";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MAX_ABOUT_ME_LENGTH } from "@/constants/const";
import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { useUpdateProfileMutation } from "@/store/user/userApi";
import { useState } from "react";
import { toast } from "react-toastify";
import sprites from "../../assets/icons/sprites.svg";
import { FieldErrors } from "../FieldError";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "../ui/drawer";

interface Props {
	className?: string;
	aboutText: string;
}

export const AboutMeAction = ({ className, aboutText }: Props) => {
	const [aboutMe, setAboutMe] = useState(aboutText);
	const [isOpen, setIsOpen] = useState(false);
	const [updateProfile, { isLoading, error, data }] =
		useUpdateProfileMutation();
	const { apiValidationErrors } = useHandleError<["aboutMe"]>(error);
	useHandleApiResponse(data, {
		toastText: "Данные успешно изменены",
		...(isOpen && { callback: () => setIsOpen(false) }),
	});

	const onClick = async () => {
		if (!aboutMe.trim() || aboutMe.trim().length > MAX_ABOUT_ME_LENGTH) {
			toast.error(
				`Длина описания не должна превышать ${MAX_ABOUT_ME_LENGTH} символов`,
			);
			return;
		}

		updateProfile({ aboutMe });
	};

	return (
		<div className={cn(className, "px-3")}>
			<div className="sm:hidden">
				<Drawer>
					<DrawerTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary text-primary"
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-white">
						<DrawerHeader className="mb-5 px-[10px]">
							<div className="flex items-center gap-x-5 justify-between">
								<DialogTitle className="font-bold text-[22px] leading-[130%]">
									Обо мне
								</DialogTitle>
								<DialogDescription className="hidden">
									Change about me
								</DialogDescription>
								<Button
									onClick={() => setAboutMe("")}
									variant="ghost"
									className="hover:bg-transparent hover:text-primary text-primary"
								>
									Очистить
								</Button>
							</div>
						</DrawerHeader>
						<div className="px-[10px] flex flex-col gap-y-1">
							<textarea
								maxLength={2000}
								value={aboutMe}
								onChange={(e) => setAboutMe(e.target.value)}
								className="rounded-xs w-full px-4 py-3 border-[1px] border-b-0 border-border resize-none h-80 outline-none"
							/>
							{apiValidationErrors?.aboutMe && (
								<FieldErrors error={apiValidationErrors.aboutMe} />
							)}
						</div>
						<DrawerFooter className="px-[10px]">
							<Button
								onClick={onClick}
								disabled={
									isLoading ||
									aboutMe.trim().length === 0 ||
									aboutMe.trim() === aboutText
								}
							>
								Сохранить
							</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className="hidden sm:block">
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary text-primary"
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
						<DialogHeader>
							<DialogTitle className="font-semibold text-[25px] leading-[130%] mb-4">
								Обо мне
							</DialogTitle>
							<DialogDescription asChild className="mb-8 flex flex-col gap-y-1">
								<>
									<textarea
										maxLength={2000}
										value={aboutMe}
										onChange={(e) => setAboutMe(e.target.value)}
										className="rounded-xs w-full px-4 py-3 border-[1px]  border-border resize-none h-80 outline-none"
									/>
									{apiValidationErrors?.aboutMe && (
										<FieldErrors error={apiValidationErrors.aboutMe} />
									)}
								</>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<div className="w-full flex items-center justify-between gap-x-5">
								<Button
									className="w-1/2"
									variant="secondary"
									onClick={() => setIsOpen(false)}
								>
									Отмена
								</Button>
								<Button
									onClick={onClick}
									disabled={
										isLoading ||
										aboutMe.trim().length === 0 ||
										aboutMe.trim() === aboutText ||
										aboutMe.trim().length > 2000
									}
									className="w-1/2"
								>
									Сохранить
								</Button>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
