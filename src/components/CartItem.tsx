import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { toast, Toaster } from 'react-hot-toast'
import { addItem, minusItem, removeItem } from '../redux/cart/slice'
import { CartItem as CartItemType } from '../redux/cart/types'
import { Trash2, CirclePlus, CircleMinus } from 'lucide-react'
import DialogDelete from '../ui/DialogDelete'

type CartItemProps = {
  id: string
  title: string
  type: string
  size: number
  prices: number[]
  count: number
  imageUrl: string
  sizes: number[]
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  prices,
  count,
  imageUrl,
  sizes
}) => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        title,
        prices,
        imageUrl,
        type,
        size,
        count
      } as CartItemType)
    )
  }

  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id))
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleConfirmDelete = () => {
    dispatch(removeItem(id))
    setOpenDialog(false)
    toast.success(`${title} был удален`, {
      position: 'top-center',
      duration: 2000
    })
  }

  const price = prices[size]
  const totalPrice = (price !== undefined ? price : 0) * count

  return (
    <div className='flex items-center gap-4 p-4 border-b border-gray-300'>
      <Helmet>
        <title>Cart</title>
        <meta name='description' content='Cart' />
        <meta name='keywords' content='Cart' />
        <meta name='robots' content='index, follow' />
      </Helmet>
      <Toaster />
      <div className='w-20 sm:w-[60px] sm:h-[60px] h-20'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className='flex-1 dark:text-mainTextColor'>
        <h3 className='text-lg sm:text-[14px] font-semibold'>{title}</h3>
        <p className='text-sm text-gray-500'>
          {type}, {sizes[size]} см.
        </p>
      </div>
      <div className='flex dark:text-mainTextColor sm:flex-col-reverse items-center gap-2'>
        <button
          className='dark:text-mainTextColor'
          onClick={onClickMinus}
          disabled={count === 1}
          style={{
            cursor: count === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <CircleMinus style={{ color: count === 1 ? '#e2e2e2' : 'gray' }} />
        </button>

        <span className='text-lg dark:text-mainTextColor font-semibold'>
          {count}
        </span>
        <button onClick={onClickPlus}>
          <CirclePlus style={{ color: 'gray' }} />
        </button>
      </div>

      <div className='flex items-center dark:text-mainTextColor gap-[15px]'>
        <span className='text-lg font-semibold'>{totalPrice}₽</span>
        <button
          onClick={handleOpenDialog}
          className='w-8 h-8 flex items-center justify-center'
        >
          <Trash2 />
        </button>
      </div>

      <DialogDelete
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title='Удалить товар?'
        message={`Вы уверены, что хотите удалить ${title}?`}
      />
    </div>
  )
}
