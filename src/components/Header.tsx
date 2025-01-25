import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { Badge, Tooltip } from '@mui/material'
import { selectCart } from '../redux/cart/selectors'
import { selectFavorites } from '../redux/favorites/selectors'
import { Switcher } from './Switcher'
import { SearchInput } from './SearchInput'
import { AnimatedNumber } from './AnimatedNumber'
import { useLocalization } from '../hooks'
import { SelectLang } from './SelectLang'
import MainLogo from '../assets/img/logo_main.png'
import greyHeart from '../assets/img/greyHeart.png'

export const Header = () => {
  const { items: cartItems, totalPrice } = useSelector(selectCart)
  const { items: favoriteItems } = useSelector(selectFavorites)
  const location = useLocation()
  const isMounted = React.useRef(false)

  const totalCount = cartItems.reduce(
    (sum: number, item) => sum + item.count,
    0
  )
  const favoriteCount = favoriteItems.length

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [cartItems])

  const { t } = useLocalization()

  return (
    <div>
      {location.pathname !== '/cart' && (
        <div className='py-[20px] sm:py-[0px] fixed top-0 left-0 pl-[5%] dark:bg-mainBgColor pr-[5%] right-0 shadow-md bg-white z-50'>
          <div className='flex h-[70px] items-center justify-between'>
            <Link to='/'>
              <div className='flex gap-[10px]'>
                <img
                  className='w-[70px] sm:hidden h-[70px] object-contain'
                  src={MainLogo}
                  alt='Pizza Logo'
                />
                <div className='sm:hidden dark:text-mainTextColor'>
                  <h1 className='text-[25px] font-[700]'>Pizza house</h1>
                  <p className='text-[18px] font-[600]'>{t('header.title')}</p>
                </div>
              </div>
            </Link>
            <SearchInput />
            <div className='flex dark:text-mainTextColor items-center gap-[20px]'>
              <div className='flex sm:ml-[10px] sm:flex-row-reverse items-center gap-[10px] sm:gap-[10px]'>
                <Switcher />
                <SelectLang />
                <Tooltip title={t('header.tooltipFav')} arrow>
                  <Link to={'/favorites'}>
                    <Badge
                      showZero={false}
                      color='error'
                      badgeContent={
                        favoriteCount > 0 ? (
                          <AnimatedNumber
                            value={favoriteCount}
                            className='text-mainTextColor'
                          />
                        ) : null
                      }
                    >
                      <img
                        src={greyHeart}
                        className='border p-[5px] w-[42px] h-[42px] dark:text-mainTextColor border-black/10 dark:border-2 rounded-lg'
                        alt=''
                      />
                    </Badge>
                  </Link>
                </Tooltip>
              </div>
              <div className='flex sm:hidden rounded-lg px-[25px] border'>
                <Tooltip title={t('header.tooltipCart')} arrow>
                  <div>
                    {location.pathname !== '/cart' && (
                      <Link
                        to='/cart'
                        className='flex items-center py-[8px] gap-[10px]'
                      >
                        <span className='font-[600]'>
                          <AnimatedNumber
                            value={totalPrice}
                            className='text-black dark:text-mainTextColor'
                          />
                          <span className='font-[800]'> $</span>
                        </span>
                        <div className='h-[100%] w-[2.5px] dark:bg-mainTextColor bg-black'>
                          |
                        </div>
                        <div className='flex gap-[3px] items-center'>
                          <ShoppingCart />
                          <span className='font-[500]'>
                            <AnimatedNumber
                              value={totalCount}
                              className='text-black dark:text-mainTextColor'
                            />
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
