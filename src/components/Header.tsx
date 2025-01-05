import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import Tooltip from '@mui/material/Tooltip'
import { Search } from './Search'
import { selectCart } from '../redux/cart/selectors'
import MainLogo from '../assets/img/logo_main.png'
import { Switcher } from './Switcher'

export const Header = () => {
  const { items, totalPrice } = useSelector(selectCart)
  const location = useLocation()
  const isMounted = React.useRef(false)

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  return (
    <div>
      {location.pathname !== '/cart' && (
        <div className='py-[20px] sm:py-[0px] fixed top-0 left-0 pl-[5%] dark:bg-[#1b1b1f] pr-[5%] right-0 shadow-md bg-white z-50'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <div className='flex gap-[10px]'>
                <img
                  className='w-[70px] h-[70px] object-contain'
                  src={MainLogo}
                  alt='Pizza Logo'
                />
                <div className='sm:hidden dark:text-mainTextColor'>
                  <h1 className='text-[25px] font-[700]'>Pizza house</h1>
                  <p className='text-[18px] font-[600]'>
                    Пицца, которая покорит ваше сердце
                  </p>
                </div>
              </div>
            </Link>
            <Search />
            <div className='flex dark:text-mainTextColor items-center gap-[20px]'>
              <div>
                <Switcher />
              </div>
              <div className='flex sm:hidden border-2 rounded-[50px] px-[25px] border-[grey]'>
                <Tooltip title='Cart' arrow>
                  <div>
                    {location.pathname !== '/cart' && (
                      <Link to='/cart' className='flex py-[12px] gap-[10px]'>
                        <span className='font-[600]'>
                          {totalPrice.toFixed(2)}{' '}
                          <span className='font-[800]'>$</span>
                        </span>
                        <div className='h-[100%] w-[2.5px] dark:bg-mainTextColor bg-black'>
                          |
                        </div>
                        <div className='flex gap-[3px] items-center'>
                          <ShoppingCart />
                          <span className='font-[500]'>{totalCount}</span>
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
