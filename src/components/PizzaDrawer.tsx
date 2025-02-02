import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Box } from '@mui/material'
import { X } from 'lucide-react'
import { CommentSkeleteon } from './CommentSkeleteon'
import { ProductInfoTooltip } from './ProductInfoTooltip'
import { CommentSection, Review } from './CommentSection'
import { useLocalization } from '@/hooks'
import { selectCommentFilter } from '@/redux/commentFilter/selectors'
import { CommentFilterEnum } from '@/redux/commentFilter/types'
import { setCommentFilter } from '@/redux/commentFilter/slice'

type PizzaType = {
  id: string
  title: { en: string; ru: string; tj: string }
  prices: number[]
  discountPrices?: number[]
  imageUrl: string
  ingredients: { en: string[]; ru: string[]; tj: string[] }
  spicyLevel: number
  deliveryTime: number
  preparationTime: number
  calories: number
  moreDetails: { en: string; ru: string; tj: string }
  reviews: Review[]
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

export const PizzaDrawer = ({
  open,
  onClose,
  pizza,
  status,
  onAddToCart
}: PizzaDrawerProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { t, lng } = useLocalization()

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
      <Box className='w-[600px] sm:w-[100%] dark:bg-[#2a2c35] bg-[#f6f6f9] h-[100vh] sm:h-auto'>
        <div className='pl-[10px] pr-[10px] flex flex-col'>
          <div className='flex sm:fixed sm:top-0 dark:bg-mainBgColor dark:text-mainTextColor sm:left-[10px] sm:right-[10px] sm:z-10 bg-white p-[16px] border-t-0 rounded-b-[12px] justify-between items-center'>
            <p className='font-[700] text-[26px] sm:text-[20px]'>
              {pizza.title[lng]}
            </p>
            <X
              onClick={onClose}
              className='hover:cursor-pointer hover:text-[gray]'
            />
          </div>
          <div className='grid sm:mt-[70px] mt-[15px] dark:bg-mainBgColor dark:text-mainTextColor bg-white rounded-[12px] sm:p-[10px] p-[5px] gap-[20px] sm:grid-cols-1 grid-cols-2'>
            <div className='flex justify-center'>
              <img
                src={pizza.imageUrl}
                alt={pizza.title[lng]}
                className='w-[80%] sm:w-[70%] object-contain'
              />
            </div>
            <div className='flex flex-col gap-[15px]'>
              <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                  <p>
                    {pizza.discountPrices &&
                    pizza.discountPrices.some(price => price !== null) ? (
                      <>
                        <span>
                          {t('pizzaDrawer.regPrice')}: {pizza.prices.join(', ')}
                          $
                        </span>
                        <br />
                        <span>
                          {t('pizzaDrawer.salePrice')}:{' '}
                          {pizza.discountPrices
                            .filter(price => price !== null)
                            .join(', ')}
                          $
                        </span>
                      </>
                    ) : (
                      <>
                        {t('pizzaDrawer.prices')}: {pizza.prices.join(', ')}$
                      </>
                    )}
                  </p>
                </div>
                <ProductInfoTooltip
                  open={tooltipOpen}
                  onClose={handleTooltipClose}
                  pizza={pizza}
                />
              </div>

              <div className='flex flex-wrap'>
                <p className='text-[15px] font-[700]'>
                  {t('pizzaDrawer.ingredients')}:
                </p>
                <p className='text-[14px]'>
                  {pizza?.ingredients[lng]?.join(', ')}
                </p>
              </div>
              <div className='flex flex-col mt-[-15px]'>
                <p className='text-[15px] font-[700]'>
                  {t('pizzaDrawer.description')}:
                </p>
                <p className='text-[14px]'>{pizza.moreDetails[lng]}</p>
              </div>
            </div>
          </div>

          {pizza.reviews?.length > 0 &&
            (status === 'loading' ? (
              <div className='mt-[20px]'>{skeletons}</div>
            ) : (
              <CommentSection
                reviews={pizza.reviews}
                filteredReviews={filteredReviews}
              />
            ))}
          <div className='flex bg-white dark:bg-mainBgColor p-[15px] fixed bottom-0 sm:w-full sm:bottom-[0%] border-t-0 rounded-t-[12px] mt-auto'>
            <button
              onClick={onAddToCart}
              className='bg-orange-500 w-[550px] sm:w-[95%] text-white py-[10px] rounded-[8px] hover:bg-orange-400 transition duration-300'
            >
              <span>{t('pizzaDrawer.addToCart')}</span>
            </button>
          </div>
        </div>
      </Box>
    </Drawer>
  )
}
