import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	step: number;
	totalSteps: number;
}

export const Steps = ({ className, step, totalSteps }: Props) => {
	const widthPercent = 100 / totalSteps;
	return (
		<div className={cn(className, "flex items-center justify-between gap-x-5")}>
			{Array.from({ length: totalSteps }).map((_, index) => (
				<span
					key={index}
					style={{ width: `${widthPercent}%` }}
					className={cn(
						"h-2 bg-gray-300 rounded-md transition-colors duration-300 ease",
						{
							"bg-primary": step >= index + 1,
						},
					)}
				/>
			))}
		</div>
	);
};
