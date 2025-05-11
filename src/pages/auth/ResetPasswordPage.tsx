import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const ResetPasswordPage = ({ className }: Props) => {
	const { params } = useQueryParams("token");

	if (!params.token) return null;

	return (
		<main className={cn(className, "box")}>
			<ResetPasswordForm token={params.token} />
		</main>
	);
};
