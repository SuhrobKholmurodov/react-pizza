import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { AnimatedNumber } from './AnimatedNumber'

type CartSummaryProps = {
  totalPrice: number
  totalCount: number
}

export const CartSummary = ({ totalPrice, totalCount }: CartSummaryProps) => {
  return (
    <div className='hidden sm:flex border dark:border-[#0d0d0d] dark:border-2 rounded-lg sm:px-[15px] px-[25px]'>
      <Link to='/cart' className='flex py-[12px] gap-[10px]'>
        <span className='font-[600]'>
          <AnimatedNumber
            value={totalPrice}
            className='text-black dark:text-mainTextColor'
          />{' '}
          <span className='font-[800]'>$</span>
        </span>
        <div className='h-[100%] w-[2.5px] dark:bg-mainTextColor bg-black'></div>
        <div className='flex gap-[3px] items-center'>
          <ShoppingCart className='sm:text-[12px]' />
          <span className='font-[500] sm:font-[400]'>
            <AnimatedNumber
              value={totalCount}
              className='text-black dark:text-mainTextColor'
            />
          </span>
        </div>
      </Link>
    </div>
  )
}
