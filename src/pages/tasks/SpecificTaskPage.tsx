import { IncrementTaskView } from "@/components/Tasks/IncrementTaskView";
import { SpecificTask } from "@/components/Tasks/SpecificTask";
import { Loader } from "@/components/ui/loader";
import { useGetSpecificTask } from "@/hooks/useGetSpecificTask";

interface Props {
	className?: string;
}

export const SpecificTaskPage = ({ className }: Props) => {
	const { task, isLoading, fromRequest } = useGetSpecificTask();

	if (isLoading)
		return (
			<div className="box flex items-center justify-center py-32">
				<Loader size="lg" />
			</div>
		);
	if (!task) return null;

	return (
		<main className={className}>
			<div className="box">
				<SpecificTask type="reply" task={task} className="md:mt-32" />
				<IncrementTaskView taskId={task.id} disabled={fromRequest} />
			</div>
		</main>
	);
};
