import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AnimatedNumber } from '../AnimatedNumber'
import { useLocalization } from '../../hooks'

type CartFooterProps = {
  totalCount: number
  totalPrice: number
  onOrderClick: () => void
}

export const CartFooter = ({
  totalCount,
  totalPrice,
  onOrderClick
}: CartFooterProps) => {
  const { t } = useLocalization() 

  return (
    <div className='fixed bottom-0 left-0 w-full px-[5%] dark:bg-mainBgColor bg-white p-4 border-t border-gray-300'>
      <div className='flex justify-between sm:flex-col sm:gap-[10px] dark:bg-mainBgColor items-center p-2 bg-white border-gray-300'>
        <div className='flex items-center gap-6 p-4 sm:flex-col sm:w-full sm:items-start dark:bg-gray-900 dark:border-gray-700 sm:gap-2 bg-white border border-gray-300 rounded-lg shadow-sm'>
          <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
            {t('cartFooter.totalPizzas')}{' '}
            <b className='text-lg'>
              <AnimatedNumber
                value={totalCount}
                className='text-black dark:text-mainTextColor'
              />
              {t('cartFooter.count')}
            </b>
          </span>
          <span className='text-sm font-medium dark:text-mainTextColor text-gray-700'>
            {t('cartFooter.orderTotal')}{' '}
            <b className='text-lg'>
              <AnimatedNumber
                value={totalPrice}
                className='text-black dark:text-mainTextColor'
              />
              $
            </b>
          </span>
        </div>

        <div className='flex items-center justify-between gap-6 sm:w-full'>
          <Link
            to='/'
            className='flex items-center gap-1 text-blue-500 hover:text-blue-700 text-lg'
          >
            <ArrowLeft fontSize='medium' />
            <span className='sm:text-[16px] sm:hidden'>
              {t('buttons.backToHome')}
            </span>
            <span className='sm:text-[16px] hidden sm:flex'>
              {t('buttons.back')}
            </span>
          </Link>
          <button
            onClick={onOrderClick}
            className='bg-orange-500 text-white px-6 sm:px-2 sm:py-2 sm:text-[16px] py-3 rounded-md hover:bg-orange-600 text-lg'
          >
            {t('cartFooter.orderDelivery')}
          </button>
        </div>
      </div>
    </div>
  )
}
