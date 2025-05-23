import { SpecificTask } from "@/components/Tasks/SpecificTask";
import { SPECIFIC_TASK_PARAM } from "@/constants/routes";
import { useParams } from "react-router";

interface Props {
	className?: string;
}

export const SpecificTaskPage = ({ className }: Props) => {
	const taskId = useParams()[SPECIFIC_TASK_PARAM];

	if (Number.isNaN(Number(taskId))) return null;

	return (
		<main className={className}>
			<div className="box">
			<SpecificTask taskId={Number(taskId)} className='md:mt-32' />
			</div>
		</main>
	);
};
