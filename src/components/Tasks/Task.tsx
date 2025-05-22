import { cn, formatDate } from "@/lib/utils";
import type { Task as TTask } from "@/types/task";
import sprites from "../../assets/icons/sprites.svg";

interface Props extends TTask {
	className?: string;
}

export const Task = ({
	className,
	title,
	price,
	createdAt,
	creator,
}: Props) => {
	return (
		<div
			className={cn(
				"flex gap-x-4 w-full max-w-[828px] cursor-pointer",
				className,
			)}
		>
			<svg className="w-6 h-6 text-black mt-2">
				<use xlinkHref={`${sprites}#comp`} />
			</svg>
			<div className="w-full ">
				<div className="flex items-center justify-between max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-y-2 min-[400px]:gap-x-2 mb-4">
					<p className="font-bold text-[22px] md:text-[32px] leading-[130%]">
						{title}
					</p>
					<span className="text-[22px] md:text-[32px] leading-[130%]">
						до {price} руб.
					</span>
				</div>
				<div className="flex flex-col gap-y-3 text-secondary-foreground">
					<p className="flex items-center justify-between gap-x-2">
						<span className="leading-[130%]">Можно выполнить удалённо</span>
						<span className="leading-[130%]">{creator}</span>
					</p>
					<p className="leading-[130%]">
						Начать{" "}
						{formatDate(createdAt, "ru-RU", "", {
							day: "numeric",
							month: "long",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
					<p className="leading-[130%]">
						<span className="text-primary">✓</span> Сделка без риска
					</p>
				</div>
			</div>
		</div>
	);
};
