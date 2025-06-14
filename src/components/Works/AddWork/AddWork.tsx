import { workActions, workSelectors } from "@/store/portfolio/workSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import sprites from "../../../assets/icons/sprites.svg";
import { Button } from "../../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../ui/drawer";
import { AddWorkFooter } from "./AddWorkFooter";
import { AddWorkImages } from "./AddWorkImages";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { cn } from "@/lib/utils";

interface Props {
	mobileClassName?: string;
	desktopClassName?: string;
}

export const AddWork = ({ mobileClassName, desktopClassName }: Props) => {
	const isOpened = useAppSelector(workSelectors.getIsOpened);
	const isDialogOpened = useAppSelector(workSelectors.getIsDialogOpened);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			workActions.clearState();
		};
	}, []);

	const onClose = () => {
		dispatch(workActions.clearState());
	};

	return (
		<>
			<div className={cn("sm:hidden", mobileClassName)}>
				<Drawer
					open={isOpened}
					onOpenChange={(open) => dispatch(workActions.setIsOpened(open))}
					onClose={onClose}
				>
					<DrawerTrigger asChild>
						<div className="w-full sm:w-[276px] rounded-2xl bg-white overflow-hidden relative  cursor-pointer min-h-[306px] flex items-center justify-center flex-col gap-y-4 border-[2px] border-dashed border-border h-full">
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
							<DrawerDescription className="hidden">
								Adding works
							</DrawerDescription>

							<DrawerTitle className="font-bold text-[22px] leading-[130%] text-center">
								Добавить работы в портфолио
							</DrawerTitle>
						</DrawerHeader>
						<AddWorkImages />
						<DrawerFooter className="px-[10px]">
							<AddWorkFooter />
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={cn("hidden sm:block h-full", desktopClassName)}>
				<Dialog
					open={isDialogOpened}
					onOpenChange={(open) => dispatch(workActions.setIsDialogOpened(open))}
				>
					<DialogTrigger asChild>
						<div className="w-[276px] rounded-2xl bg-white overflow-hidden relative  cursor-pointer min-h-[306px] flex items-center justify-center flex-col gap-y-4 border-[2px] border-dashed border-border h-full">
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
					</DialogTrigger>
					<DialogContent hideCloseButton={true} className="bg-white">
						<DialogHeader>
							<DialogTitle className="font-semibold text-[25px] leading-[130%] mb-4 text-center">
								Добавить работы в портфолио{" "}
							</DialogTitle>
							<DialogDescription asChild className="mb-8 flex flex-col gap-y-1">
								<AddWorkImages />
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<AddWorkFooter />
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};
