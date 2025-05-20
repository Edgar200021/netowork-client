import { useHandleError } from "@/hooks/useHandleError";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/store/category/categoryApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSlice } from "@/store/tasks/taskSlice";
import { Fragment, memo, useState } from "react";
import sprites from "../../assets/icons/sprites.svg";
import { Collapsible } from "../Collapsible";
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
import { Loader } from "../ui/loader";

interface Props {
	mobileClassName?: string;
	tabletClassName?: string;
	desktopClassName?: string;
}

export const TaskCategories = memo(
	({ mobileClassName, tabletClassName, desktopClassName }: Props) => {
		const { data, error, isLoading } = useGetCategoriesQuery(null);
		const [isOpened, setIsOpened] = useState(false);
		const [isDialogOpened, setIsDialogOpened] = useState(false);
		const subCategoryIds = useAppSelector(
			taskSlice.selectors.getAllTasksFiltersSubCategoryIds,
		);

		const dispatch = useAppDispatch();
		useMediaQuery("(min-width: 768px)", () => {
			if (isOpened) {
				setIsOpened(false);
			}
		});
		useMediaQuery("(max-width: 768px) and (min-width: 1280px)", () => {
			if (isDialogOpened) {
				setIsDialogOpened(false);
			}
		});

		useHandleError(error);

		//if (isLoading) return <Loader />;
		if (!data || error) return null;

		return (
			<>
				<div className={cn("md:hidden", mobileClassName)}>
					<Drawer open={isOpened} onOpenChange={setIsOpened}>
						<DrawerTrigger disabled={isLoading} asChild className="md:hidden">
							<Button className="rounded-[100px] p-[10px] !border-none">
								{isLoading && <Loader size="sm" variant="secondary" />}
								{!isLoading && (
									<svg width={20} height={20} className="text-white">
										<use xlinkHref={`${sprites}#filter`} />
									</svg>
								)}
								<span className="text-sm">Фильтры</span>
							</Button>
						</DrawerTrigger>
						<DrawerContent className="bg-white md:hidden">
							<DrawerHeader className="mb-5 px-[10px]">
								<DrawerDescription className="hidden">
									Filters
								</DrawerDescription>

								<div className="flex items-center justify-between">
									<DrawerTitle className="font-bold text-[22px] leading-[130%] ">
										Фильтры
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
								<ul className="flex flex-col gap-y-[10px] max-h-[800px] overflow-y-auto">
									<li className="flex items-center justify-between gap-x-2">
										<span className="text-sm font-semibold">Все категории</span>
										<Button
											onClick={() =>
												dispatch(
													taskActions.setAllTasksFilters({
														subCategoryIds: [],
													}),
												)
											}
											className={cn(
												"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
												{
													"font-bold bg-primary border-none":
														!subCategoryIds || subCategoryIds.length === 0,
													"hover:bg-none":
														subCategoryIds && subCategoryIds.length > 0,
													"hover:bg-primary":
														!subCategoryIds || subCategoryIds.length === 0,
												},
											)}
											variant="ghost"
										>
											{!subCategoryIds || subCategoryIds.length === 0
												? "✓"
												: ""}
										</Button>
									</li>
									{data.data.map((category) => (
										<Collapsible
											renderTrigger={(setIsCollapsed, isCollapsed) => (
												<li
													onKeyDown={(e) => {
														if (e.key === "Enter")
															setIsCollapsed((prev) => !prev);
													}}
													onClick={() => setIsCollapsed((prev) => !prev)}
													role="button"
													tabIndex={0}
													className="flex items-center justify-between"
												>
													<span className="font-semibold">{category.name}</span>
													<svg
														className={cn("text-black size-4", {
															"rotate-180": isCollapsed,
														})}
													>
														<use xlinkHref={`${sprites}#arrow`} />
													</svg>
												</li>
											)}
											key={category.id}
										>
											<ul className="flex flex-col gap-y-3 pl-8 overflow-y-auto">
												{category.subCategories.map((subCategory) => (
													<li
														className="flex items-center justify-between gap-x-2"
														key={subCategory.id}
													>
														<span className="text-sm">{subCategory.name}</span>
														<Button
															onClick={() =>
																dispatch(
																	taskActions.setAllTasksFiltersSubCategoryIds(
																		subCategory.id,
																	),
																)
															}
															className={cn(
																"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
																{
																	"font-bold bg-primary border-none":
																		!subCategoryIds ||
																		subCategoryIds.length === 0 ||
																		subCategoryIds.includes(subCategory.id),
																	"hover:bg-none":
																		subCategoryIds && subCategoryIds.length > 0,
																	"hover:bg-primary":
																		!subCategoryIds ||
																		subCategoryIds.length === 0 ||
																		subCategoryIds.includes(subCategory.id),
																},
															)}
															variant="ghost"
														>
															{!subCategoryIds ||
															subCategoryIds.length === 0 ||
															subCategoryIds.includes(subCategory.id)
																? "✓"
																: ""}
														</Button>
													</li>
												))}
											</ul>
										</Collapsible>
									))}
								</ul>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
				<div className={cn("max-md:hidden xl:hidden", tabletClassName)}>
					<Dialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
						<DialogTrigger
							disabled={isLoading}
							asChild
							className="max-md:hidden xl:hidden"
						>
							<Button className="rounded-md p-[10px] size-[44px] bg-white border-border border-[2px] hover:bg-white shadow-none ">
								{isLoading && <Loader size="sm" variant="secondary" />}
								{!isLoading && (
									<svg width={32} height={32} className="text-black">
										<use xlinkHref={`${sprites}#tablet-filter`} />
									</svg>
								)}
							</Button>
						</DialogTrigger>
						<DialogContent className="bg-white max-md:hidden xl:hidden">
							<DialogHeader className="mb-5 px-[10px]">
								<DialogDescription className="hidden">
									Filters
								</DialogDescription>
								<DialogTitle className="font-bold text-[22px] leading-[130%] ">
									Фильтры
								</DialogTitle>
							</DialogHeader>
							<DialogFooter className="px-[10px] ">
								<ul className="flex flex-col gap-y-[10px] max-h-[800px] overflow-y-auto w-full">
									<li className="flex items-center justify-between gap-x-2">
										<span className="text-sm font-semibold">Все категории</span>
										<Button
											onClick={() =>
												dispatch(
													taskActions.setAllTasksFilters({
														subCategoryIds: [],
													}),
												)
											}
											className={cn(
												"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
												{
													"font-bold bg-primary border-none":
														!subCategoryIds || subCategoryIds.length === 0,
													"hover:bg-none":
														subCategoryIds && subCategoryIds.length > 0,
													"hover:bg-primary":
														!subCategoryIds || subCategoryIds.length === 0,
												},
											)}
											variant="ghost"
										>
											{!subCategoryIds || subCategoryIds.length === 0
												? "✓"
												: ""}
										</Button>
									</li>
									{data.data.map((category) => (
										<Collapsible
											renderTrigger={(setIsCollapsed, isCollapsed) => (
												<li
													onKeyDown={(e) => {
														if (e.key === "Enter")
															setIsCollapsed((prev) => !prev);
													}}
													onClick={() => setIsCollapsed((prev) => !prev)}
													role="button"
													tabIndex={0}
													className="flex items-center justify-between"
												>
													<span className="font-semibold">{category.name}</span>
													<svg
														className={cn("text-black size-4", {
															"rotate-180": isCollapsed,
														})}
													>
														<use xlinkHref={`${sprites}#arrow`} />
													</svg>
												</li>
											)}
											key={category.id}
										>
											<ul className="flex flex-col gap-y-3 pl-8 overflow-y-auto">
												{category.subCategories.map((subCategory) => (
													<li
														className="flex items-center justify-between gap-x-2"
														key={subCategory.id}
													>
														<span className="text-sm">{subCategory.name}</span>
														<Button
															onClick={() =>
																dispatch(
																	taskActions.setAllTasksFiltersSubCategoryIds(
																		subCategory.id,
																	),
																)
															}
															className={cn(
																"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
																{
																	"font-bold bg-primary border-none":
																		!subCategoryIds ||
																		subCategoryIds.length === 0 ||
																		subCategoryIds.includes(subCategory.id),
																	"hover:bg-none":
																		subCategoryIds && subCategoryIds.length > 0,
																	"hover:bg-primary":
																		!subCategoryIds ||
																		subCategoryIds.length === 0 ||
																		subCategoryIds.includes(subCategory.id),
																},
															)}
															variant="ghost"
														>
															{!subCategoryIds ||
															subCategoryIds.length === 0 ||
															subCategoryIds.includes(subCategory.id)
																? "✓"
																: ""}
														</Button>
													</li>
												))}
											</ul>
										</Collapsible>
									))}
								</ul>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
				<div className={cn(desktopClassName, "max-xl:hidden")}>
					{isLoading && <Loader size="sm" />}
					{!isLoading && (
						<ul className="flex flex-col gap-y-[10px] max-w-fit items-start">
							<li className="flex items-center gap-x-2 flex-row-reverse pl-5">
								<span className="text-sm font-semibold">Все категории</span>
								<Button
									onClick={() =>
										dispatch(
											taskActions.setAllTasksFilters({
												subCategoryIds: [],
											}),
										)
									}
									className={cn(
										"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
										{
											"font-bold bg-primary border-none":
												!subCategoryIds || subCategoryIds.length === 0,
											"hover:bg-none":
												subCategoryIds && subCategoryIds.length > 0,
											"hover:bg-primary":
												!subCategoryIds || subCategoryIds.length === 0,
										},
									)}
									variant="ghost"
								>
									{!subCategoryIds || subCategoryIds.length === 0 ? "✓" : ""}
								</Button>
							</li>
							{data.data.map((category) => (
								<Collapsible
									renderTrigger={(setIsCollapsed, isCollapsed) => {
										const allSubcategoryIncludes = category.subCategories.every(
											(subCategory) => subCategoryIds?.includes(subCategory.id),
										);

										return (
											<li className="flex items-center justify-start gap-x-2 flex-row-reverse relative">
												<Button
													variant="ghost"
													className="absolute w-full h-full top-0 left-0 z-10 bg-transparent hover:!bg-transparent focus:!bg-transparent "
													onClick={() => setIsCollapsed((prev) => !prev)}
												/>
												<span className="font-semibold">
													{category.name.slice(0, 1).toUpperCase() +
														category.name.slice(1)}
												</span>
												<Button
													onClick={() =>
														dispatch(
															taskActions.setAllTasksFilters({
																subCategoryIds: allSubcategoryIncludes
																	? subCategoryIds?.filter(
																			(subCategoryId) =>
																				!category.subCategories
																					.map((subCategory) => subCategory.id)
																					.includes(subCategoryId),
																		)
																	: [
																			...new Set([
																				...(subCategoryIds ?? []),
																				...category.subCategories.map(
																					(subCategory) => subCategory.id,
																				),
																			]),
																		],
															}),
														)
													}
													className={cn(
														"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white z-20 relative",
														{
															"font-bold bg-primary border-none":
																!subCategoryIds ||
																subCategoryIds.length === 0 ||
																allSubcategoryIncludes,
															"hover:bg-none":
																subCategoryIds && subCategoryIds.length > 0,
															"hover:bg-primary":
																!subCategoryIds ||
																subCategoryIds.length === 0 ||
																allSubcategoryIncludes,
														},
													)}
													variant="ghost"
												>
													{!subCategoryIds ||
													subCategoryIds.length === 0 ||
													allSubcategoryIncludes
														? "✓"
														: ""}
												</Button>
												<svg
													className={cn("text-black size-3", {
														"rotate-180": isCollapsed,
													})}
												>
													<use xlinkHref={`${sprites}#arrow`} />
												</svg>
											</li>
										);
									}}
									key={category.id}
								>
									<ul className="flex flex-col gap-y-3 pl-8 items-start">
										{category.subCategories.map((subCategory) => (
											<li
												className="flex items-center flex-row-reverse  gap-x-2"
												key={subCategory.id}
											>
												<span className="text-sm">{subCategory.name}</span>
												<Button
													onClick={() =>
														dispatch(
															taskActions.setAllTasksFiltersSubCategoryIds(
																subCategory.id,
															),
														)
													}
													className={cn(
														"w-5 h-5 border-black border-[1px] p-0 rounded-[6px] text-white hover:text-white",
														{
															"font-bold bg-primary border-none":
																!subCategoryIds ||
																subCategoryIds.length === 0 ||
																subCategoryIds.includes(subCategory.id),
															"hover:bg-none":
																subCategoryIds && subCategoryIds.length > 0,
															"hover:bg-primary":
																!subCategoryIds ||
																subCategoryIds.length === 0 ||
																subCategoryIds.includes(subCategory.id),
														},
													)}
													variant="ghost"
												>
													{!subCategoryIds ||
													subCategoryIds.length === 0 ||
													subCategoryIds.includes(subCategory.id)
														? "✓"
														: ""}
												</Button>
											</li>
										))}
									</ul>
								</Collapsible>
							))}
						</ul>
					)}
				</div>
			</>
		);
	},
);
