import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatDate } from "@/lib/utils";
import type { Task } from "@/types/task";
import { User } from "@/types/user";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { MyTaskCategory } from "./MyTaskCategory";
import { MyTaskDescription } from "./MyTaskDescription";
import { MyTaskFiles } from "./MyTaskFiles";
import { MyTaskPrice } from "./MyTaskPrice";

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
}: Props) => {
	return (
		<div className={cn("md:p-8 flex flex-col gap-y-8", className)}>
			<div className="flex flex-col gap-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<p className="font-bold text-[22px] md:text-[32px] leading-[130%]">
							{title}
						</p>
					</div>
					<span className="hidden md:block text-[32px] leading-[140%]">
						до {price} руб.
					</span>
				</div>
				<p className="leading-[140%]">{formatDate(createdAt)}</p>
				<span className=" md:hidden text-[22px] leading-[140%]">
					до {price} руб.
				</span>
			</div>

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
					<Button variant="destructive">Отменить заказ</Button>
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
					<div className="flex flex-col gap-y-[38px] md:flex-row md:justify-between">
						<div className="flex items-center gap-x-4">
							<Checkbox />
							<p className="text-sm">
								Уведомлять меня о новых откликах к заданию по e-mail: &nbsp;
								{userEmail}
							</p>
						</div>
						<Button variant="destructive" className="w-fit">
							Отменить заказ
						</Button>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
