import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavorites } from '../redux/favorites/selectors'
import { clearFavorites } from '../redux/favorites/slice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { FavoritesEmpty, FavoritesItem } from '../components/Favorites'
import { DialogDelete } from '../components'

const Favorites = () => {
  const { items } = useSelector(selectFavorites)
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
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
      <div className='flex items-center gap-2 mb-4'>
        <Link to={'/'}>
          <div className='border p-[4px] focus:ring-4 hidden sm:block rounded-lg border-[#2fa4f8]'>
            <ArrowBackIcon className='cursor-pointer text-2xl' />
          </div>
        </Link>
        <div className='flex mb-2 sm:mb-0 justify-between w-full items-center'>
          <h1 className='text-3xl sm:text-[20px] font-bold text-start'>
            My Favorites
          </h1>
          {items.length > 0 && (
            <button
              onClick={handleOpenDialog}
              className='flex items-center gap-2 text-red-500 hover:text-red-600 transition duration-300'
              aria-label='Delete all favorites'
            >
              <Trash2 size={24} />
              <span className='text-[18px]'>Delete All</span>
            </button>
          )}
        </div>
      </div>
      {items.length > 0 ? (
        <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
          {items.map(item => (
            <FavoritesItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <FavoritesEmpty />
        </div>
      )}
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
