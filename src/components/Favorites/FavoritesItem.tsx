import { useDispatch } from 'react-redux'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { removeFavorite } from '../../redux/favorites/slice'
import { DialogDelete } from '../DialogDelete'

interface FavoritesItemProps {
  item: {
    id: string
    imageUrl: string
    title: string
    prices: number[]
    discountPrices?: number[]
  }
}

export const FavoritesItem = ({ item }: FavoritesItemProps) => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleConfirmDelete = () => {
    dispatch(removeFavorite(item.id))
    setOpenDialog(false)
    toast.success(`${item.title} был удален`, {
      position: 'top-center',
      duration: 2000
    })
  }

  return (
    <div className='bg-white dark:bg-mainBgColor hover:shadow-lg dark:hover:shadow-black rounded-lg transition-shadow duration-300 ease-in-out'>
      <div className='relative flex items-center justify-center'>
        <button
          onClick={handleOpenDialog}
          className='absolute top-2 right-2 text-white rounded-full p-1 transition duration-300'
          aria-label='Delete item'
        >
          <Trash
            fontSize='small'
            className='text-[red] hover:shadow-md rounded-lg'
          />
        </button>
        <Toaster />
        <img
          className='w-[260px] h-auto object-cover rounded-md'
          src={item.imageUrl}
          alt={item.title}
        />
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2 dark:text-mainTextColor'>
          {item.title}
        </h2>
        <div className='flex items-center gap-2 mb-2'>
          {item.discountPrices && item.discountPrices[0] !== null ? (
            <>
              <span className='text-lg font-bold text-red-600'>
                ${item.discountPrices[0]}
              </span>
              <span className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                ${item.prices[0]}
              </span>
            </>
          ) : (
            <span className='text-lg font-bold dark:text-mainTextColor'>
              ${item.prices[0]}
            </span>
          )}
        </div>
        <button className='bg-orange-500 w-full text-white py-[10px] rounded-[8px] hover:bg-orange-400 transition duration-300'>
          Просмотр
        </button>
      </div>
      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title='Удалить товар?'
        message={`Вы уверены, что хотите удалить ${item.title} из избранное?`}
      />
    </div>
  )
}
