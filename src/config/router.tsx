import { ROUTES } from "@/constants/routes";
import { AppLayout } from "@/layouts/AppLayout";
import { MyAccountLayout } from "@/layouts/MyAccountLayout";
import { ProfilePage } from "@/pages/ProfilePage";
import { AccountSettingsPage } from "@/pages/ProfileSettingsPage";
import { ProtectedPage } from "@/pages/ProtectedPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { VerifyAccountPage } from "@/pages/auth/VerifyAccountPage";
import { CreateTaskPage } from "@/pages/tasks/CreateTaskPage";
import { MyTasksPage } from "@/pages/tasks/MyTasksPage";
import { SpecificTaskPage } from "@/pages/tasks/SpecificTaskPage";
import { TasksPage } from "@/pages/tasks/TasksPage";
import { UserRole } from "@/types/user";
import { createBrowserRouter } from "react-router";
import { ConfirmEmailAddressPage } from "../pages/auth/ConfirmEmailAddressPage";

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: ROUTES.main,
				element: <h1>MAIN PAGE</h1>,
			},
			{
				path: ROUTES.register,
				element: <RegisterPage />,
			},
			{
				path: ROUTES.login,
				element: <LoginPage />,
			},
			{
				path: ROUTES.confirmEmailAddress,
				element: <ConfirmEmailAddressPage />,
			},
			{
				path: ROUTES.verifyAccount,
				element: <VerifyAccountPage />,
			},
			{
				path: ROUTES.forgotPassword,
				element: <ForgotPasswordPage />,
			},
			{
				path: ROUTES.resetPassword,
				element: <ResetPasswordPage />,
			},
			{
				element: <ProtectedPage />,
				children: [
					{
						element: <MyAccountLayout />,
						path: ROUTES.profile,
						children: [
							{
								element: <ProfilePage />,
								index: true,
							},
							{
								path: ROUTES.profileSettings,
								element: <AccountSettingsPage />,
							},
						],
					},
					{
						element: <MyAccountLayout />,
						path: ROUTES.myOrders,
					},
				],
			},
			{
				element: <ProtectedPage roles={[UserRole.Client]} />,
				children: [
					{
						element: <CreateTaskPage />,
						path: ROUTES.createTask,
					},
					{
						element: <MyTasksPage />,
						path: ROUTES.myTasks,
					},
				],
			},
			{
				element: <ProtectedPage roles={[UserRole.Freelancer]} />,
				children: [
					{
						element: <TasksPage />,
						path: ROUTES.tasks,
					},
					{
						element: <SpecificTaskPage />,
						path: ROUTES.specificTask(),
					},
				],
			},
		],
	},
]);
