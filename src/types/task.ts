export type Task = {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
	category: string;
	subCategory: string;
	price: number;
	creator: `${string} ${string}`;
	files: string[]
};
