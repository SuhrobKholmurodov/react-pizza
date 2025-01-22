import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { GoTopButton } from '../components'

const MainLayout = () => {
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
      <div className='hidden sm:block'>
        <GoTopButton />
      </div>
    </div>
  )
}

export default MainLayout
