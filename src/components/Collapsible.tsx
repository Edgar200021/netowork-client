import { cn } from "@/lib/utils";
import {
	type Dispatch,
	type ReactElement,
	type ReactNode,
	type SetStateAction,
	useState,
} from "react";

interface Props {
	className?: string;
	collapsed?: boolean;
	renderTrigger?: (
		fn: Dispatch<SetStateAction<boolean>>,
		isCollapsed: boolean,
	) => ReactElement;
	children: ReactNode;
}

export const Collapsible = ({
	className,
	collapsed,
	renderTrigger,
	children,
}: Props) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<>
			{renderTrigger?.(setIsCollapsed, isCollapsed)}
			<div
				className={cn(
					"grid grid-rows-[0fr] [&>*]:min-h-0  overflow-hidden transition-[grid-template-rows] duration-300 ease",
					className,
					{
						"grid-rows-[1fr]":
							collapsed !== undefined ? collapsed : isCollapsed,
					},
				)}
			>
				{children}
			</div>
		</>
	);
};
