import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetMyWorksQuery } from "@/store/portfolio/worksApi";
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
		<div className="max-sm:box">
			<h2 className="font-bold text-[32px] leading-[120%] sm:text-[40px] mb-8">
				Портфолио
			</h2>
			<ul
				className={cn(
					className,
					"grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-10",
				)}
			>
				{data.data.map((work) => (
					<li key={work.id}>
						<Work {...work} />
					</li>
				))}
				<AddWork />
			</ul>
		</div>
	);
};
