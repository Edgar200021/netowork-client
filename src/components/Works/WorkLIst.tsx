import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetMyWorksQuery } from "@/store/portfolio/worksApi";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Loader } from "../ui/loader";
import { AddWork } from "./AddWork/AddWork";
import { Work } from "./Work";

interface Props {
	className?: string;
}

export const PortfolioList = ({ className }: Props) => {
	const { data, error, isLoading } = useGetMyWorksQuery(null);
	useHandleError(error);

	if (isLoading) return <Loader />;
	if (error || !data) return <div>error</div>;

	return (
		<ul className={cn(className)}>
			<Carousel
				opts={{
					breakpoints: {
						lg: {},
					},
				}}
			>
				<CarouselContent className=" gap-x-4 md:gap-x-8 ">
					{data.data.map((work) => (
						<CarouselItem key={work.id} className="basis-auto lg:basis/1-4 ">
							<Work className="min-w-fit" {...work} />
						</CarouselItem>
					))}
					<CarouselItem className="basis-auto lg:basis/1-4 ">
						<AddWork />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</ul>
	);
};
