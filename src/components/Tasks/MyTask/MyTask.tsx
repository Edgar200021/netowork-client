import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { type Task, TaskStatus } from "@/types/task";
import type { User } from "@/types/user";
import { TaskHeader } from "../TaskHeader";
import { MyTaskCategory } from "./MyTaskCategory";
import { MyTaskDelete } from "./MyTaskDelete";
import { MyTaskDescription } from "./MyTaskDescription";
import { MyTaskFiles } from "./MyTaskFiles";
import { MyTaskPrice } from "./MyTaskPrice";
import { MyTaskReplyNotify } from "./MyTaskReplyNotify";

interface Props extends Task {
	className?: string;
	userEmail: User["email"];
}

export const MyTask = ({
	className,
	title,
	price,
	createdAt,
	id,
	category,
	subCategory,
	description,
	files,
	userEmail,
	status,
}: Props) => {
	return (
		<div className={cn("md:p-8 flex flex-col gap-y-8", className)}>
			<TaskHeader title={title} price={price} createdAt={createdAt} />
			<Tabs defaultValue="taskDetails">
				<TabsList className="mb-8 text-base border-[1px] border-border p-0">
					<TabsTrigger
						className="data-[state=active]:border-[1px] data-[state=active]:border-primary rounded-r-none text-primary-foreground !shadow-none h-full "
						value="taskDetails"
					>
						Детали задания
					</TabsTrigger>
					<TabsTrigger
						className="data-[state=active]:border-[1px] data-[state=active]:border-primary rounded-l-none text-primary-foreground !shadow-none h-full"
						value="responses"
					>
						Отклики
					</TabsTrigger>
				</TabsList>
				<TabsContent value="taskDetails" className="max-w-[600px]">
					<dl className="flex flex-col gap-y-4 mb-8">
						<div className="flex flex-col gap-y-2">
							<dt className="font-semibold text-xl leading-[130%] ">
								Номер задания
							</dt>
							<dd className="leading-[140%]">{id}</dd>
						</div>
						<MyTaskCategory
							taskId={id}
							category={category}
							subCategory={subCategory}
						/>
						<MyTaskDescription taskId={id} description={description} />
						<MyTaskPrice taskId={id} price={price} />
						<MyTaskFiles taskId={id} files={files} />
					</dl>
					{status === TaskStatus.Open && <MyTaskDelete taskId={id} />}
				</TabsContent>
				<TabsContent value="responses">
					<div className="max-w-[578px] mb-4">
						<p className="font-semibold text-xl mb-4">
							У задания пока нет откликов
						</p>
						<p className="text-bas text-secondary-foreground ">
							Скоро здесь появятся отклики исполнителей, готовых выполнить ваше
							задание. Это может занять время. Дождитесь, пока исполнители
							увидят задание и откликнутся на него
						</p>
					</div>
					<MyTaskReplyNotify
						status={status}
						userEmail={userEmail}
						taskId={id}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
};
