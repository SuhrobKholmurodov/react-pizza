import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast, Toaster } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import { selectCart } from '../redux/cart/selectors'
import { CartEmpty, CartItem, CartHeader } from '../components/Cart'
import { PaymentModal } from '../components'

const Cart = () => {
  const { totalPrice, items } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0)

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleToast = () => {
    toast.success('Ваш заказ принят в обработку!', {
      position: 'top-center',
      duration: 3000
    })
  }

  if (items.length === 0) {
    return <CartEmpty />
  }
  return (
    <div className='min-h-screen'>
      <CartHeader />
      <Toaster />
      <div className='sm:mb-[30%] mt-[70px]'>
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className='fixed bottom-0 left-0 w-full px-[5%] dark:bg-mainBgColor bg-white p-4 border-t border-gray-300'>
        <div className='flex justify-between sm:flex-col sm:gap-[10px] dark:bg-mainBgColor items-center p-2 bg-white border-gray-300'>
          <div className='flex items-center gap-6 p-4 sm:flex-col sm:w-full sm:items-start dark:bg-gray-900 dark:border-gray-700 sm:gap-2 bg-white border border-gray-300 rounded-lg shadow-sm'>
            <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
              Всего пицц: <b className='text-lg'>{totalCount} шт.</b>
            </span>
            <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
              Сумма заказа: <b className='text-lg'>{totalPrice.toFixed(2)} ₽</b>
            </span>
          </div>

          <div className='flex items-center justify-between gap-6 sm:w-full'>
            <Link
              to='/'
              className='flex items-center gap-1 text-blue-500 hover:text-blue-700 text-lg'
            >
              <ArrowLeft fontSize='medium' />
              <span className='sm:text-[16px] sm:hidden'>Вернуться назад</span>
              <span className='sm:text-[16px] hidden sm:flex'>Назад</span>
            </Link>
            <button
              onClick={handleOpenModal}
              className='bg-orange-500 text-white px-6 sm:px-2 sm:py-2 sm:text-[16px] py-3 rounded-md hover:bg-orange-600 text-lg'
            >
              Заказать доставку
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        open={openModal}
        onClose={handleCloseModal}
        handleSubmit={handleToast}
      />
    </div>
  )
}

export default Cart
