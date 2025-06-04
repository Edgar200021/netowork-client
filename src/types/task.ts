import { User } from "./user";

export enum TaskStatus {
	Completed = "completed",
	Open = "open",
	InProgress = "in_progress",
}

export type Task = {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	category: string;
	subCategory: string | null;
	price: number;
	creator: `${string} ${string}`;
	files: { fileUrl: string; fileId: string; fileName: string }[];
	status: TaskStatus;
	views: number;
	notifyAboutReplies?: boolean;
};

export type TaskReply = {
	id: string;
	description: string;
	createdAt: string;
	freelancer: Pick<User, "id" | "avatar" | "firstName" | "lastName">;
};

export type TasksSort =
	`${Extract<keyof Task, "createdAt" | "price">}-${"desc" | "asc"}`;
