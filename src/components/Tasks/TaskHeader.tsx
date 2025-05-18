import { formatDate } from '@/lib/utils';
import type { Task } from '@/types/task';
import { TelegramIcon, TelegramShareButton } from 'react-share';

interface Props extends Pick<Task, "title" | "price" | "createdAt"> {
	className?: string;
}

export const TaskHeader = ({ className, title, price, createdAt }: Props) => {
	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-x-4">
					<p className="font-bold text-[22px] md:text-[32px] leading-[130%]">
						{title}
					</p>
					<TelegramShareButton
						className="w-[24px] h-[24px] rounded-full overflow-hidden"
						url={"ok"}
					>
						<TelegramIcon className="w-full h-full object-cover" />
					</TelegramShareButton>
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
