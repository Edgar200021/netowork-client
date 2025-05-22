import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as SNPagination,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export interface PaginationProps {
	className?: string;
	totalPages: number;
	currentPage: number;
	onSetPage: (page: number) => void;
}

const getPaginationItems = (totalPages: number, currentPage: number) => {
	const items: (number | string)[] = [];

	items.push(1);

	if (currentPage - 2 > 2) {
		items.push("...");
	}

	const start = Math.max(2, currentPage - 2);
	const end = Math.min(totalPages - 1, currentPage + 2);

	for (let i = start; i <= end; i++) {
		items.push(i);
	}

	if (currentPage + 2 < totalPages - 1) {
		items.push("...");
	}

	if (totalPages > 1) {
		items.push(totalPages);
	}

	return items;
};

export const Pagination = ({
	className,
	totalPages,
	currentPage,
	onSetPage,
}: PaginationProps) => {
	if (totalPages <= 1) return null;

	const paginationItems = getPaginationItems(totalPages, currentPage);

	return (
		<SNPagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={cn("cursor-pointer", {
							"pointer-events-none": currentPage === 1,
						})}
						aria-disabled={currentPage === 1}
						onClick={() => onSetPage(currentPage - 1)}
					/>
				</PaginationItem>

				{paginationItems.map((item, index) => {
					if (item === "...") {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}
					return (
						<PaginationItem key={`page-${item}`}>
							<PaginationLink
								className={cn(
									"cursor-pointer transition-colors duration-300 ease",
									{
										"pointer-events-none bg-primary border-none text-white":
											currentPage === item,
									},
								)}
								aria-disabled={currentPage === item}
								onClick={() => onSetPage(item as number)}
								isActive={currentPage === item}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						className={cn("cursor-pointer", {
							"pointer-events-none": currentPage === totalPages,
						})}
						aria-disabled={currentPage === totalPages}
						onClick={() => onSetPage(currentPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</SNPagination>
	);
};
