import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { Trash2, CirclePlus, CircleMinus } from 'lucide-react'
import { DialogDelete } from '../DialogDelete'
import { ShowToast } from '../ShowToast'
import { AnimatedNumber } from '../AnimatedNumber'
import { useLocalization } from '../../hooks'

type CartItemProps = {
  id: string
  title: { en: string; ru: string; tj: string }
  type: string
  size: number
  prices: number[]
  count: number
  imageUrl: string
  sizes: number[]
}

export const CartItem = ({
  id,
  title,
  type,
  size,
  prices,
  count,
  imageUrl,
  sizes
}: CartItemProps) => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const { t, lng } = useLocalization()

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
    ShowToast({ message: `${title[lng]} ${t('cartItem.wasRemoved')}` })
  }

  const price = prices[size]
  const totalPrice = (price !== undefined ? price : 0) * count

  return (
    <div className='flex items-center gap-4 p-4 sm:pt-2 sm:p-0 sm:pb-2 border-b border-gray-300'>
      <Helmet>
        <title>{t('cartItem.helmetMsg')}</title>
        <meta name='description' content={t('cartItem.helmetMsg')} />
        <meta name='keywords' content={t('cartItem.helmetMsg')} />
        <meta name='robots' content='index, follow' />
      </Helmet>
      <div className='w-20 sm:w-[60px] sm:h-[60px] h-20'>
        <img
          className='w-full h-full object-cover rounded-md'
          src={imageUrl}
          alt={title[lng]}
        />
      </div>
      <div className='flex-1 dark:text-mainTextColor'>
        <h3 className='text-lg sm:text-[13px] font-semibold'>{title[lng]}</h3>
        <p className='text-sm sm:text-[12px] text-gray-500'>
          {type}, {sizes[size]} {t('cartItem.cm')}
        </p>
        <p className='text-sm sm:text-[12px] text-gray-500'>
          {t('cartItem.pricePerPiece')} {price}$
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
          <AnimatedNumber
            value={count}
            className='text-black dark:text-mainTextColor'
          />
        </span>
        <button onClick={onClickPlus}>
          <CirclePlus style={{ color: 'gray' }} />
        </button>
      </div>

      <div className='flex items-center dark:text-mainTextColor gap-[15px]'>
        <span className='text-lg font-semibold'>
          <AnimatedNumber
            value={totalPrice}
            className='text-black sm:text-[16px] dark:text-mainTextColor'
          />
          <span className='font-[800] sm:text-[16px]'> $</span>
        </span>
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
        title={t('cartItem.dialogTitle')}
        message={`${t('cartItem.dialogMsg1')} ${title[lng]}${lng === 'tj' ? '-po' : ''} ${t(
          'cartItem.dialogMsg2'
        )}`}
      />
    </div>
  )
}
