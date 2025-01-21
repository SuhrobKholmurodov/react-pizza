import { MessageCircle } from 'lucide-react'
import { ReviewFilterControls } from './ReviewFilterControls'
import { Rating } from '@mui/material'
import { useLocalization } from '../hooks/useLocalization'

export type Review = {
  profilePhoto: string
  name: string
  comment: string
  date: string
  recommendation: boolean
  rating: number
}

type CommentSectionProps = {
  reviews: Review[]
  filteredReviews: Review[]
}

export const CommentSection = ({
  reviews,
  filteredReviews
}: CommentSectionProps) => {
  const { t } = useLocalization()

  return (
    <div
      id='reviews'
      className='bg-[#f6f6f9] dark:bg-mainBgColor pb-[12px] mt-[15px] rounded-[12px]'
    >
      <div className='font-[700] sm:dark:mt-[-10px] sm:flex-col flex sm:items-start items-center dark:bg-mainBgColor justify-between bg-white rounded-[12px] gap-[5px] mt-[15px] p-[10px]'>
        <div className='flex items-center dark:text-mainTextColor gap-[3px] text-[20px]'>
          <p className='hidden sm:flex'>{t('commentSection.reviews')}</p>{' '}
          <MessageCircle className='sm:hidden' />
          <p className='font-[550]'>({reviews.length})</p>
        </div>
        <ReviewFilterControls />
      </div>
      <ul
        className='list-disc pl-[20px] rounded-[12px] pr-[20px] mt-[10px] sm:pb-[70px] overflow-y-auto max-h-[230px]'
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
                className='w-[40px] h-[40px] rounded-[50%] border-2 dark:border-[gray] border-[#e9e9e9]'
              />
              <div className='flex flex-col'>
                <p className='text-[16px] w-[470px] sm:w-full flex items-center justify-between font-[600] text-[gray]'>
                  {review.name}
                  <Rating
                    name='simple-uncontrolled'
                    readOnly
                    value={review.rating}
                    sx={{
                      fontSize: '19px',
                      '& .MuiRating-iconEmpty': {
                        color: document.body.classList.contains('dark-mode')
                          ? '#fff'
                          : 'grey'
                      }
                    }}
                  />
                </p>
                <p className='text-[14px] dark:text-mainTextColor text-[#333] leading-[1.5]'>
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
            <p className='text-[16px] sm:text-[15px] text-gray-600 text-center'>
              {t('commentSection.noReviews')}
            </p>
          </div>
        )}
      </ul>
    </div>
  )
}
