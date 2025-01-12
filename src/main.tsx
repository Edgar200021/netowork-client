import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { router } from './config/router'
import './index.css'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" />
  </Provider>
)
