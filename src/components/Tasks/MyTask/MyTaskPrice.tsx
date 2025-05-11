import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/task";
import { useState } from "react";
import sprites from "../../../assets/icons/sprites.svg";

interface Props {
	taskId: Task["id"];
	price: Task["price"];
}

export const MyTaskPrice = ({ price, taskId }: Props) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(price);

	return (
		<div className="flex flex-col gap-y-2">
			<dt className="font-semibold text-xl leading-[130%] flex items-center gap-x- ">
				<span>Какой бюджет</span>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-[44px] h-[44px] rounded-full bg-secondary "
							variant="ghost"
						>
							<svg width={20} height={20} className="text-inherit">
								<use xlinkHref={`${sprites}#pen`} />
							</svg>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle className="text-lg mb-2">Какой бюджет</DialogTitle>
						<label className={"flex flex-col gap-y-2 mb-5 relative"}>
							<span className="leading-[140%] text-secondary-foreground max-[370px]:text-sm">
								Стоимость
							</span>
							<Input
								className="py-5 pr-20"
								required
								type="number"
								value={value}
								onChange={(e) => setValue(e.target.valueAsNumber)}
							/>
							{/*{(errors.price?.message || apiValidationErrors?.price) && (
									<FieldErrors
										error={errors.price?.message || apiValidationErrors!.price!}
									/>
								)}*/}
						</label>
						<Button disabled={value === price || !value}>
							Изменить описание
						</Button>
					</DialogContent>
				</Dialog>
			</dt>
			<dd className="leading-[140%]">до {price} руб.</dd>
		</div>
	);
};
