import { ROUTES } from '@/constants/routes'
import { AppLayout } from '@/layouts/AppLayout'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { VerifyAccountPage } from '@/pages/auth/VerifyAccountPage'
import { createBrowserRouter } from 'react-router'
import { ConfirmEmailAddressPage } from '../pages/auth/ConfirmEmailAddressPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
    ],
  },
])
