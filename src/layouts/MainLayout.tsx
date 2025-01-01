import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'

const MainLayout: React.FC = () => {
  const location = useLocation()
  return (
    <div>
      <Header />
      <div
        className={` ${
          location.pathname === '/cart' ? 'mt-[0]' : 'pt-[130px] sm:mt-[-40px]'
        } sm:pb-[30%] pb-[8%]`}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
