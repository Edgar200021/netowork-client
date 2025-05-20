import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const loaderVariants = cva("", {
	variants: {
		variant: {
			default: "bg-primary",
			secondary: "bg-secondary",
			destructive: "bg-destructive",
		},
		size: {
			default: "w-[50px] p-2",
			sm: "w-[20px] p-1.5",
			lg: "w-[120px] p-3",
			xl: "w-[200px] p-4",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

interface Props extends VariantProps<typeof loaderVariants> {
	className?: string;
}

export const Loader = ({ className, variant, size }: Props) => {
	return (
		<span
			className={cn(
				"block loader",
				loaderVariants({ variant, size, className }),
			)}
		/>
	);
};
