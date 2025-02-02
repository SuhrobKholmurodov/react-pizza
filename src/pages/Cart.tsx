import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { selectCart } from '@/redux/cart/selectors'
import { useLocalization } from '@/hooks'
import { ShowToast } from '@/components/ShowToast'
import { CartEmpty, CartFooter, CartHeader, CartItem, PaymentModal } from '@/components/Cart'

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
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      <CartFooter
        totalCount={totalCount}
        totalPrice={totalPrice}
        onOrderClick={handleOpenModal}
      />
    </div>
  )
}
