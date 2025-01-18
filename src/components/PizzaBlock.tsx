import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingBasket, MessageCircle, Check, MinusIcon } from 'lucide-react'
import {
  Star,
  FavoriteBorder,
  Favorite,
  RemoveRedEyeOutlined
} from '@mui/icons-material'
import { selectCartItemById } from '../redux/cart/selectors'
import { Pizza, ReviewItemProps } from '../redux/pizza/types'
import { CartItem } from '../redux/cart/types'
import { addItem, minusItem } from '../redux/cart/slice'
import { selectFavoriteItemById } from '../redux/favorites/selectors'
import { addFavorite, removeFavorite } from '../redux/favorites/slice'
import { PizzaDrawer } from './PizzaDrawer'
import { ShowToast } from './ShowToast'
import { AnimatedNumber } from './AnimatedNumber'

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

export const PizzaBlock = ({
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
}: PizzaBlockProps) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))
  const favoriteItem = useSelector(selectFavoriteItemById(id))
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const onClickFavorite = () => {
    if (favoriteItem) {
      dispatch(removeFavorite(id))
      ShowToast({ message: `${title} удалена из избранного!` })
    } else {
      const favoriteItem: Pizza = {
        id,
        title,
        prices,
        discountPrices: discountPrices || [],
        reviews,
        deliveryTime,
        imageUrl,
        sizes,
        types,
        rating: 0,
        onPromotion: false,
        ingredients,
        isNew,
        moreDetails,
        spicyLevel,
        preparationTime,
        calories
      }
      dispatch(addFavorite(favoriteItem))
      ShowToast({ message: `${title} добавлена в избранное!` })
    }
  }

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
    ShowToast({ message: `${title} добавлена в корзину!` })
  }

  const onClickMinus = () => {
    dispatch(minusItem(id))
    if (addedCount === 1) {
      ShowToast({ message: `${title} удалена из корзины!` })
    }
  }

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        )
          .toFixed(1)
          .replace(/\.0$/, '')
      : 0
  return (
    <div className='p-4 group hover:shadow-xl transition-shadow group rounded-lg dark:hover:shadow-black hover:shadow-[#e4e3e3] duration-300 ease-in-out relative'>
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
          <div className='absolute top-0 right-[0px] flex flex-col-reverse items-center gap-[5px]'>
            <div
              onClick={handleDrawerOpen}
              className='hover:cursor-pointer border border-gray-200 dark:border-gray-500 p-[2px] rounded-md dark:text-mainTextColor dark:hover:text-[#4892f9] hover:text-[#4892f9]'
            >
              <RemoveRedEyeOutlined className='w-[20px] text-[grey] hover:text-[#4892f9] h-[20px]' />
            </div>
            <div
              onClick={onClickFavorite}
              className={`border-gray-200 border duration-300 dark:border-gray-500 p-[2px] hover:cursor-pointer rounded-md dark:hover:border-[#c0bfbf] hover:border-gray-300 ${
                favoriteItem ? 'animate-bounce' : ''
              }`}
            >
              {favoriteItem ? (
                <Favorite
                  sx={{ color: 'rgb(248, 16, 75)' }}
                  className='w-[20px] h-[20px]'
                />
              ) : (
                <FavoriteBorder
                  sx={{ color: 'grey' }}
                  className='w-[20px] hover:text-[red] h-[20px]'
                />
              )}
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
                <div className='relative text-[16px] font-[200] text-[grey]'>
                  <span className="relative before:content-[''] before:absolute before:top-[45%] before:bg-[gray] before:opacity-70 before:w-[110%] before:h-[0.1em] before:left-[-5%] before:rounded-[0.1em] before:transform before:rotate-[-15deg]">
                    {prices[activeSize]} $
                  </span>
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
            <div className='flex justify-between items-center w-full'>
              <div className='text-sm text-green-500 font-[500]'>
                вы сэкономите:{' '}
                {Math.round(
                  ((prices[activeSize] - discountPrices[activeSize]) /
                    prices[activeSize]) *
                    100
                )}
                %
              </div>
            </div>
          ) : (
            <div className='invisible text-sm'>-</div>
          )}
        </div>

        <div
          onClick={handleDrawerOpen}
          className='flex flex-col hover:cursor-pointer hover:text-gray-400 items-end gap-[4px] text-gray-500 font-bold'
        >
          <div className='flex hover:cursor-pointer hover:text-gray-400 items-center gap-[4px] text-gray-500 font-bold'>
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
          <div className='dark:text-mainTextColor  text-black flex gap-[3px] items-center'>
            <p className='mt-[-3px]'>
              <Star className='text-[orange]' sx={{ fontSize: '16px' }} />
            </p>
            <p className='font-[500]'>{averageRating}</p>
          </div>
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
          <ShoppingBasket className='h-5 group-hover:animate-pulse w-5' />
          <span className='ml-2'>{deliveryTime} минут</span>
        </button>
        {addedCount > 0 && (
          <button className='flex items-center justify-center px-[16px] py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600'>
            <AnimatedNumber value={addedCount} className='text-mainTextColor' />
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
