import { TaskCategories } from "@/components/Tasks/TaskCategories";
import { TaskSearch } from "@/components/Tasks/TaskSearch";

interface Props {
	className?: string;
}

export const TasksPage = ({ className }: Props) => {
	return (
		<main className={className}>
			<div className="box">
				<TaskSearch className='mb-10' />
				<TaskCategories mobileClassName='fixed bottom-10 left-1/2 -translate-x-1/2' />
			</div>
		</main>
	);
};
