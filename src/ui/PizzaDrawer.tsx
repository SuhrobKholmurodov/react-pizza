import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import { MessageCircle, X } from 'lucide-react'
import { CommentSkeleteon } from '../components/CommentSkeleteon'
import ProductInfoTooltip from './ProductInfoTooltip'
import { CommentFilterEnum } from '../redux/commentFilter/types'
import { setCommentFilter } from '../redux/commentFilter/slice'
import { selectCommentFilter } from '../redux/commentFilter/selectors'

type PizzaType = {
  id: string
  title: string
  price: number
  discountPrice?: number
  imageUrl: string
  ingredients: string[]
  spicyLevel: number
  deliveryTime: number
  preparationTime: number
  calories: number
  moreDetails: string
  reviews: {
    profilePhoto: string
    name: string
    comment: string
    date: string
    recommendation: boolean
    rating: number
  }[]
}

type PizzaDrawerProps = {
  open: boolean
  onClose: () => void
  pizza: PizzaType
  status: 'loading' | 'loaded'
  onAddToCart: () => void
}

const skeletons = [...new Array(4)].map((_, index) => (
  <CommentSkeleteon key={index} />
))

export const PizzaDrawer: React.FC<PizzaDrawerProps> = ({
  open,
  onClose,
  pizza,
  status,
  onAddToCart
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleTooltipClose = () => {
    setTooltipOpen(false)
  }
  const dispatch = useDispatch()
  const currentFilter = useSelector(selectCommentFilter)

  useEffect(() => {
    if (pizza) {
      dispatch(setCommentFilter(CommentFilterEnum.ALL))
    }
  }, [pizza, dispatch])

  const filteredReviews = pizza?.reviews?.filter(review => {
    if (currentFilter === CommentFilterEnum.RECOMMEND) {
      return review.recommendation === true
    }
    if (currentFilter === CommentFilterEnum.NOT_RECOMMEND) {
      return review.recommendation === false
    }
    return true
  })

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='w-[600px] sm:w-[100%] bg-[#f6f6f9] dark:bg-[#1b1b1f] min-h-screen'>
        <div className='pl-[10px] pr-[10px] *:dark:bg-[rgb(101,117,133)] flex flex-col'>
          <div className='flex sm:fixed sm:top-0  sm:left-[10px] sm:right-[10px] sm:z-10 bg-white p-[16px] border-t-0 rounded-b-[12px] justify-between items-center'>
            <p className='font-[700] text-[26px] sm:text-[20px]'>
              {pizza.title}
            </p>
            <X
              onClick={onClose}
              className='hover:cursor-pointer hover:text-[gray]'
            />
          </div>
          <div className='grid sm:mt-[70px] mt-[15px] bg-white rounded-[12px] p-[5px] gap-[20px] sm:grid-cols-1 grid-cols-2'>
            <div className='flex justify-center'>
              <img
                src={pizza.imageUrl}
                alt={pizza.title}
                className='w-[80%] sm:w-[70%] object-contain'
              />
            </div>
            <div className='flex flex-col gap-[15px]'>
              <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                  <p>
                    {pizza.discountPrice ? (
                      <>
                        <span>Цена без скидки: {pizza.price}$</span>
                        <br />
                        <span>Цена со скидкой: {pizza.discountPrice}$</span>
                      </>
                    ) : (
                      <>Цена: {pizza.price}$</>
                    )}
                  </p>
                </div>
                <ProductInfoTooltip
                  open={tooltipOpen}
                  onClose={handleTooltipClose}
                  pizza={pizza}
                ></ProductInfoTooltip>
              </div>

              <div className='flex flex-wrap'>
                <p className='text-[15px] font-[700]'>Ингредиенты:</p>
                <p className='text-[14px]'>{pizza?.ingredients?.join(', ')}</p>
              </div>
              <div className='flex flex-col mt-[-15px]'>
                <p className='text-[15px] font-[700]'>Описание:</p>
                <p className='text-[14px]'>{pizza.moreDetails}</p>
              </div>
            </div>
          </div>

          {pizza.reviews?.length > 0 &&
            (status === 'loading' ? (
              <div className='mt-[20px]'>{skeletons}</div>
            ) : (
              <div id='reviews' className='bg-[#f6f6f9] pl-[10px] pr-[10px] mt-[15px] rounded-[12px]'>
                <div className='font-[700] sm:flex-col flex sm:items-start items-center justify-between bg-white rounded-[12px] gap-[5px] mt-[15px] p-[10px]'>
                  <div className='flex items-center gap-[5px] text-[22px]'>
                    <p className='hidden sm:flex '>Отзывы</p>{' '}
                    <MessageCircle className='sm:hidden' /> (
                    {pizza?.reviews?.length})
                  </div>
                  <div className='flex items-center justify-between gap-[15px]'>
                    <button
                      onClick={() =>
                        dispatch(setCommentFilter(CommentFilterEnum.ALL))
                      }
                      className={`py-[7px] dark:bg-gray-500 text-[15px] sm:text-[14px] hover:bg-[black]  dark:text-white hover:text-white duration-300 px-[20px] sm:px-[10px] rounded-[12px] bg-[#f6f6f9] ${
                        currentFilter === CommentFilterEnum.ALL
                          ? 'bg-black dark:bg-[#343946] text-white'
                          : ''
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() =>
                        dispatch(setCommentFilter(CommentFilterEnum.RECOMMEND))
                      }
                      className={`py-[7px] dark:bg-gray-500 text-[15px] sm:text-[14px] hover:bg-[black] dark:text-white hover:text-white duration-300 px-[35px] sm:px-[15px] rounded-[12px] bg-[#f6f6f9] ${
                        currentFilter === CommentFilterEnum.RECOMMEND
                          ? 'bg-black dark:bg-[#343946] text-white'
                          : ''
                      }`}
                    >
                      Recommend
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          setCommentFilter(CommentFilterEnum.NOT_RECOMMEND)
                        )
                      }
                      className={`py-[7px] dark:bg-gray-500 text-[15px] sm:text-[14px] hover:bg-[black]  dark:text-white hover:text-white duration-300 px-[35px] sm:px-[15px] rounded-[12px] bg-[#f6f6f9] ${
                        currentFilter === CommentFilterEnum.NOT_RECOMMEND
                          ? 'bg-black dark:bg-[#343946] text-white'
                          : ''
                      }`}
                    >
                      Not Recommend
                    </button>
                  </div>
                </div>
                <ul
                  className='list-disc pl-[20px] pr-[20px] mt-[10px] sm:pb-[70px] overflow-y-auto max-h-[230px]'
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                      <li key={index} className='flex gap-[15px] mb-[20px]'>
                        <img
                          src={review.profilePhoto}
                          alt={review.name}
                          className='w-[40px] h-[40px] rounded-[50%] border-2 border-[#e9e9e9]'
                        />
                        <div className='flex flex-col'>
                          <p className='text-[16px] w-[470px] sm:w-full flex items-center justify-between font-[600] text-[gray]'>
                            {review.name}
                            <Rating
                              name='simple-uncontrolled'
                              readOnly
                              value={review.rating}
                              sx={{ fontSize: '19px' }}
                            />
                          </p>
                          <p className='text-[14px] text-[#333] leading-[1.5]'>
                            {review.comment}
                          </p>
                          <p className='text-[12px] text-[gray] mt-[5px]'>
                            {review.date}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className='flex justify-center items-center h-[100px]'>
                      <p className='text-[16px] sm:text-[14px] text-gray-600 text-center'>
                        Нет отзывов для выбранного фильтра.
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            ))}
          <div className='flex bg-white p-[14px] fixed bottom-0 sm:w-full sm:bottom-[0%] border-t-0 rounded-t-[12px] mt-auto'>
            <button
              onClick={onAddToCart}
              className='bg-orange-500 w-[550px] sm:w-[95%] text-white py-[10px] rounded-[8px] hover:bg-orange-400 transition duration-300'
            >
              <span>Добавить в корзину</span>
            </button>
          </div>
        </div>
      </Box>
    </Drawer>
  )
}