import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/store/category/categoryApi";
import { useState } from "react";
import sprites from "../../assets/icons/sprites.svg";
import { Collapsible } from "../Collapsible";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
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
}

export const TaskCategories = ({ mobileClassName }: Props) => {
	const { data, error, isLoading } = useGetCategoriesQuery(null);
	const [isOpened, setIsOpened] = useState(false);

	useHandleError(error);

	if (isLoading) return <Loader />;
	if (!data || error) return null;

	return (
		<div className={cn("sm:hidden", mobileClassName)}>
			<Drawer open={isOpened} onOpenChange={setIsOpened}>
				<DrawerTrigger asChild>
					<Button className="w-[98px] rounded-[100px] p-[10px] !border-none">
						<svg width={20} height={20} className="text-white">
							<use xlinkHref={`${sprites}#filter`} />
						</svg>
						<span className="text-sm">Фильтры</span>
					</Button>
				</DrawerTrigger>
				<DrawerContent className="bg-white">
					<DrawerHeader className="mb-5 px-[10px]">
						<DrawerDescription className="hidden">Filters</DrawerDescription>

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
									className="w-5 h-5 border-black border-[1px] p-0 rounded-[6px]"
									variant="ghost"
								/>
							</li>
							{data.data.map((category) => (
								<Collapsible
									renderTrigger={(setIsCollapsed, isCollapsed) => (
										<li
											onKeyDown={(e) => {
												if (e.key === "Enter") setIsCollapsed((prev) => !prev);
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
													className="w-5 h-5 border-black border-[1px] p-0 rounded-[6px]"
													variant="ghost"
												/>
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
	);
};
