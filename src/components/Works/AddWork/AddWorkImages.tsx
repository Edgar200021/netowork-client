import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WORK_IMAGES_MAX_COUNT } from "@/constants/const";
import { cn } from "@/lib/utils";
import {
	workActions,
	workSelectors,
	workSlice,
} from "@/store/portfolio/workSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { type ChangeEvent, useEffect, useRef } from "react";

export const AddWorkImages = () => {
	const fileRef = useRef<HTMLInputElement>(null);
	const files = useAppSelector(workSelectors.getFiles);
	const dispatch = useAppDispatch();

	const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
		const currentFiles = Array.from(e.target.files || []);
		dispatch(workSlice.actions.setFiles(currentFiles));
	};

	useEffect(() => {
		if (files.length === 0) return;

		return () => {
			dispatch(workActions.clearState());
		};
	}, []);

	return (
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
								onClick={() => dispatch(workSlice.actions.deleteFile(file.id))}
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
				className="border-[1px] border-dashed border-border flex flex-col  items-center justify-center gap-y-6 sm:gap-y-3 bg-secondary/50 py-8 cursor-pointer rounded-2xl "
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
				<span className="hidden sm:block text-secondary-foreground">или</span>
				<Button
					className={cn(
						"bg-white text-primary-foreground shadow-none sm:font-semibold sm:text-lg",
						{
							"bg-gray-400 hover:bg-gray-400":
								files.length >= WORK_IMAGES_MAX_COUNT,
							"hover:bg-white": files.length < WORK_IMAGES_MAX_COUNT,
						},
					)}
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
		</div>
	);
};
