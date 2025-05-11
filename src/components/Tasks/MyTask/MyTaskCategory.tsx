import { useLazyGetCategoriesQuery } from "@/store/category/categoryApi";
import { Task } from "@/types/task";

import { FieldErrors } from "@/components/FieldError";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useHandleError } from "@/hooks/useHandleError";
import { useState } from "react";
import sprites from "../../../assets/icons/sprites.svg";

interface Props {
	taskId: Task["id"];
	category: Task["category"];
	subCategory: Task["subCategory"];
}

export const MyTaskCategory = ({
	category: categoryLabel,
	subCategory,
}: Props) => {
	const [getCategories, { error, isLoading, isError, data }] =
		useLazyGetCategoriesQuery();
	const [open, setOpen] = useState(false);
	const [newCategory, setNewCategory] = useState({
		categoryId: 0,
		subCategoryId: 0,
	});
	const { apiValidationErrors } = useHandleError(error);

	const onOpen = async () => {
		console.log("IS OPEN", open);
		if (!open) {
			setOpen(true);
			if (!data) {
				await getCategories(null).unwrap();
			}
			return;
		}
		setOpen(false);
	};

	const category = data?.data.find(
		(category) => category.id === newCategory.categoryId,
	);

	const currentSubcategory = category?.subCategories.find(
		(sub) => sub.name === subCategory,
	);

	const onSubmit = () => {};

	return (
		<div className="flex flex-col gap-y-2">
			<dt className="font-semibold text-xl leading-[130%] flex items-center gap-x-2 ">
				<span>Категория и подкатегория</span>
				<Dialog open={open} onOpenChange={onOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary "
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle className="text-lg mb-2">
							Выберете новую категория
						</DialogTitle>
						<div className="flex items-center gap-x-5 justify-between mb-5">
							<div className="flex flex-col gap-y-4 w-full">
								<label className="flex flex-col gap-y-2">
									<span>Категории услуг</span>
									<Select
										onValueChange={(val: string) => {
											setNewCategory({
												categoryId: Number(val),
												subCategoryId: 0,
											});
										}}
										value={String(newCategory.categoryId)}
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
								</label>

								{apiValidationErrors?.categoryId && (
									<FieldErrors error={apiValidationErrors.categoryId!} />
								)}
							</div>
							<div className="flex flex-col gap-y-4 w-full">
								<label className="flex flex-col gap-y-2">
									<span>Подкатегории услуги</span>
									<Select
										onValueChange={(val: string) =>
											setNewCategory((prev) => ({
												categoryId: prev.categoryId,
												subCategoryId: Number(val),
											}))
										}
										value={String(newCategory.subCategoryId)}
										required
										disabled={isLoading || isError || !data || !category}
									>
										<SelectTrigger className="py-5">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="min-w-0">
											{category?.subCategories
												.filter(
													(subcat) => subcat.id !== currentSubcategory?.id,
												)
												.map((subCategory) => (
													<SelectItem
														key={subCategory.id}
														value={String(subCategory.id)}
													>
														{subCategory.name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</label>
							</div>
						</div>
						<Button onClick={onSubmit}>Изменить категорию</Button>
					</DialogContent>
				</Dialog>
			</dt>
			<dd className="leading-[140%]">
				{categoryLabel}-{subCategory}
			</dd>
		</div>
	);
};
