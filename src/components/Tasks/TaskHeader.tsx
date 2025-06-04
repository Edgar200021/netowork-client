import { ROUTES } from "@/constants/routes";
import { cn, formatDate } from "@/lib/utils";
import type { Task } from "@/types/task";
import sprites from "../../assets/icons/sprites.svg";
import { Share } from "../Share";

interface Props
	extends Pick<Task, "title" | "price" | "createdAt" | "id" | "views"> {
	className?: string;
}

export const TaskHeader = ({
	className,
	title,
	price,
	createdAt,
	views,
	id,
}: Props) => {
	const shareUrl = `${window.location.protocol}//${window.location.host}${ROUTES.specificTask(id)}`;
	return (
		<div className={cn("flex flex-col gap-y-4", className)}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-4">
					<p className="font-bold text-[22px] md:text-[32px] leading-[130%]">
						{title}
					</p>
					<Share url={shareUrl} />
					<div className="flex items-center gap-x-2 py-4 px-3">
						<svg className="size-6 text-primary">
							<title>Eye icon</title>
							<use xlinkHref={`${sprites}#eye-open`} />
						</svg>
						<span className="text-base leading-[140%]">{views}</span>
					</div>
				</div>
				<span className="hidden md:block text-[32px] leading-[140%]">
					до {price} руб.
				</span>
			</div>
			<p className="leading-[140%]">{formatDate(createdAt)}</p>
			<span className=" md:hidden text-[22px] leading-[140%]">
				до {price} руб.
			</span>
		</div>
	);
};
