import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { taskActions, taskSelectors } from "@/store/tasks/taskSlice";
import { useEffect, useReducer, useRef, useState } from "react";
import sprites from "../../assets/icons/sprites.svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
	className?: string;
}

export const TaskSearch = ({ className }: Props) => {
	const value = useAppSelector(taskSelectors.getAllTasksFiltersSearch);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebounce(search);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setSearch(value || "");
	}, [value]);

	useEffect(() => {
		dispatch(taskActions.setAllTasksFilters({ search: debounced }));
	}, [debounced]);

	return (
		<div className={cn("flex flex-col md:flex-row", className)}>
			<label className="relative w-full">
				<svg className="w-4 h-4 cursor-pointer absolute left-2 top-[50%] translate-y-[-50%]">
					<use xlinkHref={`${sprites}#search`} />
				</svg>

				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Поиск по ключевым словам"
					className="!py-3 pl-10 rounded-md rounded-b-none md:rounded-b-md md:rounded-tr-none md:rounded-br-none h-full"
				/>
			</label>
			<Button className="rounded-t-none md:max-w-[165px] md:w-full md:rounded-t-md md:rounded-tl-none md:rounded-bl-none">
				Найти
			</Button>
		</div>
	);
};
