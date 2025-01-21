import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import axios from 'axios'
import '../index.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useLocalization } from '../hooks'

const apiUrl = import.meta.env.VITE_API_URL

interface Pizza {
  id: number
  imageUrl: string
  title: string
  moreDetails: string
  onPromotion: boolean
}

const fetchAllPromotionalPizzas = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}`)
    return data.filter((pizza: Pizza) => pizza.onPromotion)
  } catch (error) {
    console.error('Failed to fetch promotional pizzas:', error)
    return []
  }
}

export const SwiperPizza = () => {
  const [promotionalItems, setPromotionalItems] = useState<Pizza[]>([])

  const { t } = useLocalization()

  useEffect(() => {
    const fetchPromotions = async () => {
      const promotions = await fetchAllPromotionalPizzas()
      setPromotionalItems(promotions)
    }
    fetchPromotions()
  }, [])

  return (
    <div className='mx-auto relative'>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper rounded-lg sm:rounded-[0] shadow-lg relative z-10 w-full'
        slidesPerView={1}
      >
        {promotionalItems.map(el => (
          <SwiperSlide
            key={el.id}
            className='bg-yellow-50 dark:bg-neutral-900 px-[180px] py-10 shadow-md flex flex-col items-center justify-between gap-6 relative sm:px-[30px] sm:py-4 sm:gap-2'
          >
            <button className='absolute top-[45px] left-4 bg-orange-500 text-white pl-[45px] pr-[20px] py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300 transform rotate-90 sm:top-6 sm:pl-8 sm:left-[-20px] sm:pr-2 sm:py-[2px] sm:text-xs'>
              {t('swiperPizza.onPromotion')}
            </button>

            <div className='flex gap-[220px] justify-between items-center sm:gap-[4px] sm:flex-col'>
              <img
                src={el.imageUrl}
                alt={el.title}
                className='w-[250px] h-[250px] rounded-lg object-cover sm:w-[130px] sm:h-[130px]'
              />
              <div className='flex flex-col justify-center text-start max-w-[500px] items-start sm:max-w-full sm:items-center sm:text-center'>
                <h3 className='text-3xl dark:text-mainTextColor font-bold text-gray-800 mb-4 sm:text-lg sm:mb-2'>
                  {el.title}
                </h3>
                <p className='text-lg leading-[30px] sm:leading-[18px] mb-[10px] dark:text-gray-300 text-gray-600 sm:text-[12px]'>
                  {el.moreDetails}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
