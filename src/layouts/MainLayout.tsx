import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { GoTopButton } from '../components'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cart/selectors'
import { selectFavorites } from '../redux/favorites/selectors'

const MainLayout = () => {
  const location = useLocation()
  const { items: cartItems } = useSelector(selectCart)
  const { items: favoriteItems } = useSelector(selectFavorites)

  const shouldHideGoTopButton =
    (location.pathname === '/cart' && cartItems.length === 0) ||
    (location.pathname === '/favorites' && favoriteItems.length === 0)

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
      {!shouldHideGoTopButton && (
        <div className='hidden sm:block'>
          <GoTopButton />
        </div>
      )}
    </div>
  )
}

export default MainLayout
