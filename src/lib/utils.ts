import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const determineMonthsSpentOnSite = (date: Date | string): string => {
	const localDate: Date = new Date(date);

	if (localDate.toString() === "Invalid Date") throw new Error("Invalid date");

	const now = new Date();

	const months = Math.abs(
		localDate.getMonth() +
			12 * localDate.getFullYear() -
			(now.getMonth() + 12 * now.getFullYear()),
	);

	return months === 0
		? "меньше месяца"
		: months === 1
			? "1 месяц"
			: `${months} месяцев`;
};
