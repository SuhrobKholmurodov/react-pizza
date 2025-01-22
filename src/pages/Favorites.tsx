import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, Home } from 'lucide-react'
import { selectFavorites } from '../redux/favorites/selectors'
import { selectCart } from '../redux/cart/selectors'
import { selectFilter } from '../redux/filter/selectors'
import { clearFavorites } from '../redux/favorites/slice'
import { FavoritesEmpty, FavoritesItem } from '../components/Favorites'
import { CartSummary, DialogDelete } from '../components'
import { useLocalization } from '../hooks'

export const Favorites = () => {
  const dispatch = useDispatch()
  const { items: favoriteItems } = useSelector(selectFavorites)
  const { items: cartItems, totalPrice } = useSelector(selectCart)
  const { searchValue } = useSelector(selectFilter)
  const [openDialog, setOpenDialog] = useState(false)
  const { t , lng} = useLocalization()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredFavorites = favoriteItems.filter(item =>
    item.title[lng].toLowerCase().includes(searchValue.toLowerCase())
  )

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
    <div className='dark:bg-mainBgColor dark:text-mainTextColor min-h-screen'>
      {favoriteItems.length > 0 && (
        <div className='flex items-center gap-2 mb-4'>
          <Link to={'/'}>
            <div className='border p-[4px] focus:ring-4 hidden sm:block rounded-lg border-[#2fa4f8]'>
              <ArrowLeft className='cursor-pointer text-2xl' />
            </div>
          </Link>
          <div className='flex mb-2 sm:mb-0 justify-between w-full items-center'>
            <h1 className='text-3xl sm:text-[20px] font-bold text-start'>
              {t('myFavorites.myFavorites')}
            </h1>
            <button
              onClick={handleOpenDialog}
              className='flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-300'
              aria-label='Delete all favorites'
            >
              <Trash2 size={24} />
              <span className='text-[18px]'>{t('myFavorites.deleteAll')}</span>
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
    </div>
  )
}
