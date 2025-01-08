import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, ShoppingCart, Home } from 'lucide-react'
import { selectFavorites } from '../redux/favorites/selectors'
import { selectCart } from '../redux/cart/selectors'
import { clearFavorites } from '../redux/favorites/slice'
import { FavoritesEmpty, FavoritesItem } from '../components/Favorites'
import { DialogDelete } from '../components'

const Favorites = () => {
  const dispatch = useDispatch()
  const { items: favoriteItems } = useSelector(selectFavorites)
  const { items: cartItems, totalPrice } = useSelector(selectCart)
  const [openDialog, setOpenDialog] = useState(false)
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
              My Favorites
            </h1>
            <button
              onClick={handleOpenDialog}
              className='flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-300'
              aria-label='Delete all favorites'
            >
              <Trash2 size={24} />
              <span className='text-[18px]'>Delete All</span>
            </button>
          </div>
        </div>
      )}
      {favoriteItems.length > 0 ? (
        <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
          {favoriteItems.map(item => (
            <FavoritesItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <FavoritesEmpty />
        </div>
      )}
      <div className='px-[5%] dark:text-mainTextColor sm:pl-[5%] fixed left-0 right-0 sm:flex-row bottom-0 dark:bg-mainBgColor dark:border-t-[black] p-4 border-t bg-gray-100 sm:flex hidden justify-center sm:justify-between items-center'>
        <Link
          to='/'
          className='hidden sm:flex items-center gap-2 text-black dark:text-mainTextColor hover:text-gray-600 dark:hover:text-gray-300 transition duration-300'
        >
          <Home size={20} />
          <span className='font-[500]'>Home</span>
        </Link>

        <div className='hidden sm:flex border dark:border-[#0d0d0d] dark:border-2 rounded-lg sm:px-[15px] px-[25px]'>
          <Link to='/cart' className='flex py-[12px] gap-[10px]'>
            <span className='font-[600]'>
              {totalPrice} <span className='font-[800]'>$</span>
            </span>
            <div className='h-[100%] w-[2.5px] dark:bg-mainTextColor bg-black'></div>
            <div className='flex gap-[3px] items-center'>
              <ShoppingCart className='sm:text-[12px]' />
              <span className='font-[500] sm:font-[400]'>{totalCount}</span>
            </div>
          </Link>
        </div>
      </div>
      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title='Удалить все избранное?'
        message='Вы уверены, что хотите удалить все товары из избранного? Это действие невозможно отменить'
      />
    </div>
  )
}

export default Favorites
