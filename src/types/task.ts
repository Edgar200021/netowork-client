export enum TaskStatus {
	Completed = "completed",
	Open = "open",
	InProgress = "in_progress",
}

export type Task = {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	category: string;
	subCategory: string | null;
	price: number;
	creator: `${string} ${string}`;
	files: { fileUrl: string; fileId: string; fileName: string }[];
	status: TaskStatus;
};
