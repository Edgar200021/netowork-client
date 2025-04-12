import { workActions, workSelectors } from "@/store/portfolio/workSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import sprites from "../../../assets/icons/sprites.svg";
import { Button } from "../../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTrigger,
} from "../../ui/drawer";
import { AddWorkFooter } from "./AddWorkFooter";
import { AddWorkImages } from "./AddWorkImages";

export const AddWork = () => {
	const isOpened = useAppSelector(workSelectors.getIsOpened);
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
			<Drawer
				open={isOpened}
				onOpenChange={(open) => dispatch(workActions.setIsOpened(open))}
				onClose={onClose}
			>
				<DrawerTrigger asChild>
					<div className="w-[276px]  rounded-2xl bg-white overflow-hidden relative  cursor-pointer min-h-[306px] flex items-center justify-center flex-col gap-y-4 border-[2px] border-dashed border-border h-full">
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
					<AddWorkImages />
					<AddWorkFooter />
				</DrawerContent>
			</Drawer>
		</>
	);
};
