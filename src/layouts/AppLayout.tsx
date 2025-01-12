import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <>
      <header>Header</header>
      <div className='box'>
        <Outlet />
      </div>
      <footer>footer</footer>
    </>
  )
}
