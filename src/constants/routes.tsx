import type { Task } from "@/types/task";

export const SPECIFIC_TASK_PARAM = "taskId";

export const ROUTES = {
	main: "/",
	register: "/auth/register",
	login: "/auth/login",
	forgotPassword: "/auth/forgot-password",
	resetPassword: "/auth/reset-password",
	confirmEmailAddress: "/auth/confirm-email-address",
	verifyAccount: "/auth/account-verification",
	profile: "/profile",
	profileSettings: "/profile/settings",
	createTask: "/client/create-task",
	myTasks: "/client/my-tasks",
	myReplies: "/freelancer/my-replies",
	tasks: "/tasks",
	specificTask: (taskId?: Task["id"]) =>
		taskId ? `/tasks/${taskId}` : `/tasks/:${SPECIFIC_TASK_PARAM}`,
} as const;
