import { useHandleApiResponse } from "@/hooks/useHandleApiResponse";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useDeleteWorkMutation } from "@/store/portfolio/worksApi";
import type { Work } from "@/types/work";
import { Button } from "../ui/button";

interface Props {
	className?: string;
	id: Work["id"];
}

export const WorkDelete = ({ className, id }: Props) => {
	const [deleteWork, { isLoading, error, data }] = useDeleteWorkMutation();

	useHandleApiResponse(data);
	useHandleError(error);

	return (
		<Button
			onClick={() => deleteWork({ id })}
			disabled={isLoading}
			variant="ghost"
			className={cn(
				"w-[44px] h-[44px] rounded-full flex items-center justify-center bg-black/50 text-3xl  text-white",
				className,
			)}
		>
			<span className="-translate-y-1"> &times;</span>
		</Button>
	);
};
