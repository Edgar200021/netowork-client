import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/facebook',
    element: <div>facebook</div>,
  },
  {
    path: '/auth/google',
    element: <div>google</div>,
  },
])
