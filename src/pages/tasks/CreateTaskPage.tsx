import { CreateTaskForm } from "@/components/forms/CreateTask/CreateTaskForm";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const CreateTaskPage = ({ className }: Props) => {
	return (
		<main className={cn(className, "box")}>
			<CreateTaskForm />
		</main>
	);
};
