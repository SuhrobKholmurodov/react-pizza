import React from 'react'
import { useLocalization } from '../hooks'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type CategoriesProps = {
  value: number
  onChangeCategory: (idx: number) => void
}

const categoryKeys = [
  'categories.all',
  'categories.forKids',
  'categories.chicken',
  'categories.vegetarian',
  'categories.spicy',
  'categories.cheesy'
]

export const Categories = React.memo(
  ({ value, onChangeCategory }: CategoriesProps) => {
    const { t } = useLocalization()

    return (
      <div className='relative max-w-full'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          centeredSlides={false}
          modules={[Autoplay, Pagination, Navigation]}
          className='w-full bg-transparent'
        >
          {categoryKeys.map((categoryKey, i) => (
            <SwiperSlide key={i} className='!w-auto !bg-transparent'>
              <div
                onClick={() => onChangeCategory(i)}
                className={`cursor-pointer rounded-full transition-colors duration-200 
                  px-4 py-2 text-center flex items-center text-[15px] justify-center
                  ${
                    value === i
                      ? 'bg-black dark:bg-gray-700 text-white'
                      : 'dark:text-mainTextColor bg-gray-300 dark:bg-[#202127] hover:text-white hover:dark:bg-[#252a34] hover:bg-[#1f1e1e]'
                  }`}
              >
                {t(categoryKey)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
)
