import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Work as TWork } from "@/types/work";
import { WorkDelete } from "./WorkDelete";

interface Props extends TWork {
	className?: string;
}

export const Work = ({ className, id, title, images }: Props) => {
	return (
		<div
			className={cn(
				"w-full sm:max-w-[276px] sm:min-w-[250px] rounded-2xl bg-white flex flex-col overflow-hidden relative",
				className,
			)}
		>
			<WorkDelete id={id} className="absolute top-4 right-4 z-10" />
			<Carousel
				opts={{
					dragFree: false,
				}}
				className="w-full bg-blue-500"
			>
				<CarouselContent>
					{images.map((image) => (
						<CarouselItem className=" h-[250px] md:h-[276px]" key={image}>
							<img
								src={image}
								alt={title}
								className="w-full h-full object-cover"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-4 border-[2px] border-primary" />
				<CarouselNext className="right-4 border-[2px] border-primary" />
				<CarouselDots
					className="absolute bottom-3 left-[50%] -translate-x-[50%]"
					activeClassName="bg-primary w-2 h-2"
					inactiveClassName="w-2 h-2 bg-white"
				/>
			</Carousel>
			<p className="py-6 px-4 font-semibold leading-[130%] md:text-xl">
				{title}
			</p>
		</div>
	);
};
