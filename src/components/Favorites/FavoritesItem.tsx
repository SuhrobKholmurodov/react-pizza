import { useDispatch } from 'react-redux'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { removeFavorite } from '../../redux/favorites/slice'
import { DialogDelete } from '../DialogDelete'
import { ShowToast } from '../ShowToast'
import { PizzaDrawer } from '../PizzaDrawer'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

interface FavoritesItemProps {
  item: {
    id: string
    imageUrl: string
    title: string
    prices: number[]
    discountPrices?: number[]
    typeNames?: string[]
    sizes?: number[]
    moreDetails?: string
    ingredients?: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews?: any[]
    spicyLevel?: number
    deliveryTime?: number
    preparationTime?: number
    calories?: number
  }
}

export const FavoritesItem = ({ item }: FavoritesItemProps) => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const handleConfirmDelete = () => {
    dispatch(removeFavorite(item.id))
    setOpenDialog(false)
    ShowToast({ message: `${item.title} был удален` })
  }

  const onClickAdd = () => {
    const defaultTypeNames = ['тонкое']
    const defaultSizes = [25, 30, 35]
    const defaultPrices = [0]
    const prices =
      item.prices && item.prices.length > 0 ? item.prices : defaultPrices

    const cartItem: CartItem = {
      id: item.id,
      title: item.title,
      prices: prices,
      imageUrl: item.imageUrl,
      type:
        item.typeNames && item.typeNames.length > 0
          ? item.typeNames[0]
          : defaultTypeNames[0],
      size:
        item.sizes && item.sizes.length > 0 ? item.sizes[0] : defaultSizes[0],
      sizes: item.sizes || defaultSizes,
      count: 0
    }

    dispatch(addItem(cartItem))
    ShowToast({ message: `${item.title} добавлена в корзину!` })
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
        <button
          onClick={handleDrawerOpen}
          className='bg-orange-500 w-full text-white py-[10px] rounded-[8px] hover:bg-orange-400 transition duration-300'
        >
          Просмотр
        </button>
      </div>
      <PizzaDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        pizza={{
          id: item.id,
          title: item.title,
          prices: item.prices,
          moreDetails: item.moreDetails || '',
          discountPrices: item.discountPrices,
          imageUrl: item.imageUrl,
          ingredients: item.ingredients || [],
          reviews: item.reviews || [],
          spicyLevel: item.spicyLevel || 0,
          deliveryTime: item.deliveryTime || 0,
          preparationTime: item.preparationTime || 0,
          calories: item.calories || 0
        }}
        status='loaded'
        onAddToCart={onClickAdd}
      />

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
