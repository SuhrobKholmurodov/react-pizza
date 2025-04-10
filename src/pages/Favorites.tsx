import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { selectFavorites } from '@/redux/favorites/selectors'
import { selectCart } from '@/redux/cart/selectors'
import { selectFilter } from '@/redux/filter/selectors'
import { useLocalization } from '@/hooks'
import { clearFavorites } from '@/redux/favorites/slice'
import { FavoritesEmpty, FavoritesItem } from '@/components/Favorites'
import { CartSummary, DialogDelete } from '@/components'

export const Favorites = () => {
  const dispatch = useDispatch()
  const { items: favoriteItems } = useSelector(selectFavorites)
  const { items: cartItems, totalPrice } = useSelector(selectCart)
  const { searchValue } = useSelector(selectFilter)
  const [openDialog, setOpenDialog] = useState(false)
  const { t, lng } = useLocalization()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredFavorites = favoriteItems.filter(item => {
    const title = item.title[lng]
    return title && title.toLowerCase().includes(searchValue.toLowerCase())
  })

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleConfirmDelete = () => {
    dispatch(clearFavorites())
    setOpenDialog(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className='dark:bg-mainBgColor dark:text-mainTextColor min-h-screen'
    >
      {favoriteItems.length > 0 && (
        <div className='flex items-center gap-2 mb-4'>
          <Link to={'/'}>
            <div className='border p-[4px] sm:p-[2px] focus:ring-4 hidden sm:block rounded-lg border-[#2fa4f8]'>
              <ArrowLeft className='cursor-pointer' />
            </div>
          </Link>
          <div className='flex mb-2 sm:mb-0 justify-between w-full items-center'>
            <h1 className='text-3xl sm:text-[16px] font-bold text-start'>
              {t('myFavorites.myFavorites')}
            </h1>
            <button
              onClick={handleOpenDialog}
              className='flex items-center gap-2 sm:gap-[2px] text-red-500 hover:text-red-600 transition duration-300'
              aria-label='Delete all favorites'
            >
              <Trash2 size={20} />
              <span className='text-[18px] sm:text-[16px]'>
                {t('myFavorites.deleteAll')}
              </span>
            </button>
          </div>
        </div>
      )}
      {filteredFavorites.length > 0 ? (
        <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
          {filteredFavorites.map(item => (
            <FavoritesItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <FavoritesEmpty />
        </div>
      )}
      <div className='px-[5%] dark:text-mainTextColor sm:pl-[5%] fixed left-0 right-0 sm:flex-row bottom-0 dark:bg-mainBgColor dark:border-t-[black] p-4 border-t bg-gray-100 hidden sm:flex justify-center sm:justify-between items-center'>
        <Link
          to='/'
          className='items-center flex gap-2 text-black dark:text-mainTextColor hover:text-gray-600 dark:hover:text-gray-300 transition duration-300'
        >
          <Home size={20} />
          <span className='font-[500]'>{t('myFavorites.home')}</span>
        </Link>
        <CartSummary totalPrice={totalPrice} totalCount={totalCount} />
      </div>
      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title={t('myFavorites.dialogTitle')}
        message={t('myFavorites.dialogMsg')}
      />
    </motion.div>
  )
}
