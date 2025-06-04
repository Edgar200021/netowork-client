import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterIcon,
	TwitterShareButton,
	VKIcon,
	VKShareButton,
	ViberIcon,
	ViberShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";
import sprites from "../assets/icons/sprites.svg";
import { Button } from "./ui/button";

interface Props {
	url: string;
	triggerClassName?: string;
	contentClassName?: string;
}

export const Share = ({ url, triggerClassName, contentClassName }: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"w-[24px] h-[24px] p-0 text-primary hover:text-primary",
						triggerClassName,
					)}
				>
					<svg className="w-full h-full">
						<title>Share</title>
						<use xlinkHref={`${sprites}#share`} />
					</svg>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("flex items-center flex-wrap gap-2", contentClassName)}
			>
				<TelegramShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<TelegramIcon className="w-full h-full object-cover" />
				</TelegramShareButton>
				<FacebookShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<FacebookIcon className="w-full h-full object-cover" />
				</FacebookShareButton>
				<TwitterShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<TwitterIcon className="w-full h-full object-cover" />
				</TwitterShareButton>
				<LinkedinShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<LinkedinIcon className="w-full h-full object-cover" />
				</LinkedinShareButton>
				<RedditShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<RedditIcon className="w-full h-full object-cover" />
				</RedditShareButton>
				<WhatsappShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<WhatsappIcon className="w-full h-full object-cover" />
				</WhatsappShareButton>
				<VKShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<VKIcon className="w-full h-full object-cover" />
				</VKShareButton>
				<ViberShareButton
					className="w-[24px] h-[24px] rounded-full overflow-hidden"
					url={url}
				>
					<ViberIcon className="w-full h-full object-cover" />
				</ViberShareButton>
			</PopoverContent>
		</Popover>
	);
};
