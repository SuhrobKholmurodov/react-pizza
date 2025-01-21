import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cart/selectors'
import {
  CartEmpty,
  CartItem,
  CartHeader,
  PaymentModal,
  CartFooter
} from '../components/Cart'
import { ShowToast } from '../components/ShowToast'
import { useLocalization } from '../hooks/useLocalization'

export const Cart = () => {
  const { totalPrice, items } = useSelector(selectCart)
  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0)
  const [openModal, setOpenModal] = useState(false)
  const { t } = useLocalization()

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleToast = () => {
    ShowToast({ message: t('cart.toastMsg') })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (items.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className='min-h-screen'>
      <CartHeader />
      <div className='sm:mb-[30%] mt-[70px]'>
        {items.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <PaymentModal
        open={openModal}
        onClose={handleCloseModal}
        handleSubmit={handleToast}
      />
      <CartFooter
        totalCount={totalCount}
        totalPrice={totalPrice}
        onOrderClick={handleOpenModal}
      />
    </div>
  )
}
