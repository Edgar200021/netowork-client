import { Header } from '@/components/Header'
import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-y-8 md:gap-y-20">
      <Header />
      <Outlet />
      <footer>footer</footer>
    </div>
  )
}
