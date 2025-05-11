import { MyTaskList } from "@/components/Tasks/MyTaskList";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface Props {
	className?: string;
}

export const MyTasksPage = ({ className }: Props) => {
	return (
		<main className={cn("", className)}>
			<div className="box">
				<div className="rounded-xl shadow-md flex items-center gap-x-5 justify-between py-4 px-8 mb-12">
					<p className="text-lg leading-[130%] max-[400px]:text-sm">
						Создайте заказ и выберите исполнителя
					</p>
					<Button asChild>
						<Link to={ROUTES.createTask}>Создать заказ</Link>
					</Button>
				</div>

				<MyTaskList />
			</div>
		</main>
	);
};
