import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { selectCart } from '../redux/cart/selectors'
import { CartItem, CartEmpty } from '../components'
import CartHeader from '../components/CartHeader';

const Cart: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0)


  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div>
      <CartHeader />
      <div className='sm:mb-[26%] mt-[80px]'>
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className='fixed bottom-0 left-0 w-full px-[5%] dark:bg-[#1b1b1f] bg-white p-4 border-t border-gray-300'>
        <div className='flex justify-between sm:flex-col sm:gap-[10px] dark:bg-[#1b1b1f] items-center p-2 bg-white border-gray-300'>
          <div className='flex items-center gap-6 p-4 sm:flex-col sm:w-full sm:items-start dark:bg-[#2e2e34] sm:gap-2 bg-white border border-gray-300 rounded-lg shadow-sm'>
            <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
              Всего пицц: <b className='text-lg'>{totalCount} шт.</b>
            </span>
            <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
              Сумма заказа: <b className='text-lg'>{totalPrice} ₽</b>
            </span>
          </div>

          <div className='flex items-center gap-6'>
            <Link
              to='/'
              className='flex items-center gap-2 text-blue-500 hover:text-blue-700 text-lg'
            >
              <ArrowBackIcon fontSize='medium' />
              <span className='sm:text-[16px]'>Вернуться назад</span>
            </Link>
            <button className='bg-orange-500 text-white px-6 sm:px-2 sm:py-2 sm:text-[16px] py-3 rounded-md hover:bg-orange-600 text-lg'>
              Оплатить сейчас
            </button>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default Cart
