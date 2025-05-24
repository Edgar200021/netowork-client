import { TaskCategories } from "@/components/Tasks/TaskCategories";
import { TaskFilters } from "@/components/Tasks/TaskFIlters";
import { TaskPagination } from '@/components/Tasks/TaskPagination';
import { TaskSearch } from "@/components/Tasks/TaskSearch";
import { TaskSort } from "@/components/Tasks/TaskSort";
import { TasksList } from "@/components/Tasks/TasksList";
import { WithInViewPort } from "@/components/WithInViewPort";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const TasksPage = ({ className }: Props) => {
	return (
		<main className={className}>
			<div className="box">
				<TaskFilters selector="getAllTasksFilters" />
				<TaskSearch className="mb-10 md:mb-20" />
				<div className="md:hidden flex items-center gap-x-2 fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
					<TaskCategories />
					<TaskSort />
				</div>
				<div className="grid grid-cols-2 xl:grid-cols-[1fr_2fr] gap-y-10 xl:gap-y-20 xl:grid-rows-[100px_1fr] relative">
					<WithInViewPort
						options={{
							rootMargin: "-100px 0px 0px 0px",
							threshold: 1,
						}}
						renderElement={(ref, isInView) => {
							return (
								<div
									ref={ref as React.RefObject<HTMLDivElement>}
									className={cn(
										"max-md:hidden col-span-1 row-span-2 self-start xl:sticky xl:top-0 xl:left-0 transition-transform duration-300 ease",
										{
											"xl:translate-y-[60px]": !isInView,
										},
									)}
								>
									<TaskCategories />
								</div>
							);
						}}
					/>

					<TaskSort mobileClassName="hidden" />
					<TasksList className="col-span-2 xl:col-span-1 xl:col-start-2" loaderClassName='col-span-2 max-w-auto mx-auto mt-20 xl:mt-0' />
				</div>
			</div>
		</main>
	);
};
