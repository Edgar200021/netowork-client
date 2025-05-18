import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import sprites from "../../assets/icons/sprites.svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

export const TaskSearch = ({ className }: Props) => {
	const [search, setSearch] = useState("");
	const debounced = useDebounce(search);

	return (
		<div className={cn("flex flex-col md:flex-row", className)}>
			<label className="relative w-full">
				<svg className="w-4 h-4 cursor-pointer absolute left-2 top-[50%] translate-y-[-50%]">
					<use xlinkHref={`${sprites}#search`} />
				</svg>

				<Input
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
