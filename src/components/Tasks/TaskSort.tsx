import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";
import type { TasksSort } from "@/types/task";
import { useState } from "react";
import sprites from "../../assets/icons/sprites.svg";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

interface Props {
	mobileClassName?: string;
	tabletClassName?: string;
}

const sorts: { label: string; value: TasksSort }[] = [
	{
		label: "По дате публикации (DESC)",
		value: "createdAt-desc",
	},
	{
		label: "По дате публикации (ASC)",
		value: "createdAt-asc",
	},
	{
		label: "По цене (DESC)",
		value: "price-desc",
	},
	{
		label: "По цене (ASC)",
		value: "price-asc",
	},
];

export const TaskSort = ({ mobileClassName, tabletClassName }: Props) => {
	const [isOpened, setIsOpened] = useState(false);
	const sort = useAppSelector(taskSelectors.getAllTasksFiltersSort);
	const dispatch = useAppDispatch();
	useMediaQuery("(min-width: 768px)", () => {
		if (isOpened) {
			setIsOpened(false);
		}
	});

	const onSetSort = (val: TasksSort) => {
		dispatch(taskActions.setAllTasksFiltersSort(val));
	};

	return (
		<>
			<div className={cn("md:hidden", mobileClassName)}>
				<Drawer open={isOpened} onOpenChange={setIsOpened}>
					<DrawerTrigger className="md:hidden" asChild>
						<Button className=" rounded-[100px] p-[10px] !border-none">
							<svg width={20} height={20} className="text-white">
								<use xlinkHref={`${sprites}#sort`} />
							</svg>
							<span className="text-sm">Сортировка</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-white md:hidden">
						<DrawerHeader className="mb-5 px-[10px]">
							<DrawerDescription className="hidden">Sort</DrawerDescription>

							<div className="flex items-center justify-between">
								<DrawerTitle className="font-bold text-[22px] leading-[130%] ">
									Сортировка
								</DrawerTitle>
								<Button
									variant="ghost"
									className="!text-black p-0"
									onClick={() => setIsOpened(false)}
								>
									&#10006;
								</Button>
							</div>
						</DrawerHeader>
						<DrawerFooter className="px-[10px]">
							<ul className="flex flex-col gap-y-[10px]">
								{sorts.map(({ label, value }) => (
									<li
										key={value}
										className="flex items-center justify-between gap-x-2"
									>
										<span>{label}</span>
										<Button
											onClick={onSetSort.bind(null, value)}
											variant="ghost"
											className="size-5 rounded-full border-primary border-[2px] p-[1px]"
										>
											<span
												className={cn(
													"border-[6px] border-primary rounded-full opacity-0 transition-opacity duration-300 ease",
													{
														"opacity-100": sort?.includes(value),
													},
												)}
											/>
										</Button>
									</li>
								))}
							</ul>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
			<div className={cn("max-md:hidden ", tabletClassName)}>
				<div className="flex gap-x-6 xl:justify-end min-[1500px]:items-center">
					<span className="font-bold text-base leading-[130%] text-nowrap">
						Сортировать по
					</span>

					<div className="flex items-center gap-x-4 gap-y-2 flex-wrap  justify-end">
						{sorts.map(({ value, label }) => (
							<Button
								onClick={onSetSort.bind(null, value)}
								className={cn("text-[140%] text-sm lg:text-base py-3 px-4", {
									"text-primary border-primary": sort?.includes(value),
								})}
								variant="outline"
								key={value}
							>
								{label}
							</Button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
