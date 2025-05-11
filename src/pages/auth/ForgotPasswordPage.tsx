import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const ForgotPasswordPage = ({ className }: Props) => {
	return (
		<main className={cn(className, "box")}>
			<ForgotPasswordForm />
		</main>
	);
};
