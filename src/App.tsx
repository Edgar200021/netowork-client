import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { PageLoader } from './components/ui/pageLoader'
import { router } from './config/router'
import { useHandleError } from './hooks/useHandleError'
import { baseApi } from './store/baseApi'
import { useGetMeQuery } from './store/user/userApi'

function App() {
  const { isLoading, isError } = baseApi.useHealthCheckQuery(null)
  const { isLoading: getMeLoading, error } = useGetMeQuery(null)

  useHandleError(error)

  if (isLoading || getMeLoading) return <PageLoader />
  if (isError) return <h1>Наш сервис временно недоступен</h1>

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
