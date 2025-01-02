import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ShoppingBasket,
  MessageCircle,
  Eye,
  Heart,
  Check,
  MinusIcon
} from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import { selectCartItemById } from '../redux/cart/selectors'
import { CartItem } from '../redux/cart/types'
import { ReviewItemProps } from '../redux/pizza/types'
import { addItem, minusItem } from '../redux/cart/slice'
import { PizzaDrawer } from '../ui/PizzaDrawer'

const typeNames = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string
  title: string
  prices: number[]
  discountPrices?: number[]
  reviews: ReviewItemProps[]
  ingredients: string[]
  deliveryTime: number
  isNew: boolean
  moreDetails: string
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
  spicyLevel: number
  preparationTime: number
  calories: number
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  prices,
  discountPrices,
  ingredients,
  reviews,
  deliveryTime,
  moreDetails,
  isNew,
  imageUrl,
  sizes,
  types,
  spicyLevel,
  preparationTime,
  calories
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      prices,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize,
      count: 0,
      sizes
    }
    dispatch(addItem(item))
    toast.success(`${title} добавлена в корзину!`, {
      position: 'top-center',
      duration: 2000
    })
  }

  const onClickMinus = () => {
    dispatch(minusItem(id))
  }

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)

  return (
    <div className='p-4 hover:shadow-xl transition-shadow group rounded-lg dark:hover:shadow-black hover:shadow-[#f1f0f0] duration-300 ease-in-out relative'>
      <div>
        <div className='relative flex items-center justify-center'>
          <img
            onClick={handleDrawerOpen}
            className='w-[260px] hover:cursor-pointer h-auto object-cover rounded-md'
            src={imageUrl}
            alt={title}
          />
          {isNew && (
            <div className='absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold py-1 px-2 rounded-tl-lg rounded-br-lg'>
              Новинка
            </div>
          )}
          <Toaster />
          <div
            className='absolute z-10 top-0 right-[0px] 
              opacity-0 transform -translate-y-6 
              group-hover:translate-y-0 gap-[5px] group-hover:opacity-100 
              flex flex-col items-center transition-all duration-300 ease-in-out'
          >
            <div
              onClick={handleDrawerOpen}
              className='transition-opacity hover:cursor-pointer border border-gray-200 dark:hover:border-[#c0bfbf] hover:border-gray-300 duration-300 delay-200 group-hover:opacity-100
                  p-1 rounded-md dark:text-mainTextColor dark:hover:text-[#4892f9] hover:text-[#4892f9]'
            >
              <Eye className='w-[20px] h-[20px]' />
            </div>
            <div className='transition-opacity hover:cursor-pointer border border-gray-200 hover:border-gray-300 duration-300 delay-300 dark:hover:border-[#c0bfbf] group-hover:opacity-100 rounded-md p-1'>
              <Heart className='text-black dark:text-mainTextColor dark:hover:text-[red] w-[20px] h-[20px] hover:text-[red]' />
            </div>
          </div>
        </div>
        <h4 className='text-lg font-semibold dark:text-mainTextColor mt-2 text-center'>
          {title}
        </h4>
      </div>
      <div className='mt-3 rounded-md p-[5px] dark:text-[#e3e1e1] dark:bg-[#202127] bg-[#f5f6f7]'>
        <div className='flex flex-col gap-[10px] w-full'>
          <ul className='flex w-full gap-2.5'>
            {types.map(typeId => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={`py-2 text-center rounded-md cursor-pointer flex-1 transition-all duration-300 ${
                  types.length === 1 || activeType === typeId
                    ? 'bg-[#ebedf0] dark:bg-[#2a2c35] dark:text-mainTextColor text-black'
                    : 'bg-gray-150'
                }`}
              >
                <div className='inline-flex items-center justify-center gap-1'>
                  {(types.length === 1 || activeType === typeId) && (
                    <Check className='w-[20px] mt-[5px] h-[20px] text-green-500' />
                  )}
                  <span>{typeNames[typeId]}</span>
                </div>
              </li>
            ))}
          </ul>
          <ul className='flex w-full gap-2.5'>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={`text-center py-2 rounded-md cursor-pointer flex-1 transition-all duration-300 ${
                  activeSize === i
                    ? 'bg-[#ebedf0] dark:bg-[#2a2c35] dark:text-mainTextColor text-black'
                    : 'bg-gray-150'
                }`}
              >
                <div className='inline-flex items-center justify-center gap-1'>
                  {activeSize === i && (
                    <Check className='w-[20px] mt-[5px] h-[20px] text-green-500' />
                  )}
                  <span>{size} см.</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-start mt-4 py-2'>
        <div className='flex flex-col items-start'>
          <div className='flex items-center gap-[5px] flex-row-reverse min-h-[30px]'>
            {discountPrices && discountPrices[activeSize] !== null ? (
              <>
                <div className='text-[16px] font-semibold line-through text-[grey]'>
                  {prices[activeSize]} $
                </div>
                <div className='text-[20px] font-[750] dark:text-mainTextColor'>
                  {discountPrices[activeSize]}$
                </div>
              </>
            ) : (
              <div className='text-[20px] font-[750] dark:text-mainTextColor'>
                {prices[activeSize]} $
              </div>
            )}
          </div>
          {discountPrices && discountPrices[activeSize] !== null ? (
            <div className='text-sm text-green-500 font-[500]'>
              вы сэкономите:{' '}
              {Math.round(
                ((prices[activeSize] - discountPrices[activeSize]) /
                  prices[activeSize]) *
                  100
              )}
              %
            </div>
          ) : (
            <div className='invisible text-sm'>-</div>
          )}
        </div>

        <div
          onClick={handleDrawerOpen}
          className='flex hover:cursor-pointer hover:text-gray-400 items-center gap-[4px] text-gray-500 font-bold'
        >
          {reviews.length > 0 && (
            <>
              <MessageCircle />
              <p>{reviews.length}</p>
              <p>
                {reviews.length % 10 === 1 && reviews.length % 100 !== 11
                  ? 'отзыв'
                  : reviews.length % 10 >= 2 &&
                    reviews.length % 10 <= 4 &&
                    (reviews.length % 100 < 10 || reviews.length % 100 >= 20)
                  ? 'отзыва'
                  : 'отзывов'}
              </p>
            </>
          )}
        </div>
      </div>

      <div className='flex gap-[10px]'>
        {addedCount > 0 && (
          <button
            onClick={onClickMinus}
            className='flex items-center justify-center px-[8px] py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'
          >
            <MinusIcon className='text-[12px]' />
          </button>
        )}
        <button
          onClick={onClickAdd}
          className='flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'
        >
          <ShoppingBasket className='h-5 w-5' />
          <span className='ml-2'>{deliveryTime} минут</span>
        </button>
        {addedCount > 0 && (
          <button className='flex items-center justify-center px-[16px] py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'>
            <p>{addedCount}</p>
          </button>
        )}
      </div>
      <PizzaDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        pizza={{
          id,
          title,
          prices,
          moreDetails,
          discountPrices,
          imageUrl,
          ingredients,
          reviews,
          spicyLevel,
          deliveryTime,
          preparationTime,
          calories
        }}
        status='loaded'
        onAddToCart={onClickAdd}
      />
    </div>
  )
}
