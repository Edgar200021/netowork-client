export type Task = {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	category: string;
	subCategory: string;
	price: number;
	creator: `${string} ${string}`;
	files: string[];
	status: "completed" | "open" | "in_progress";
};
