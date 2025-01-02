import React from 'react'
import { Link } from 'react-router-dom'

import cartEmptyImg from '../assets/img/empty-cart.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CartHeader from './CartHeader'

export const CartEmpty: React.FC = () => (
  <div>
    <CartHeader />
    <div className='flex text-center items-center dark:text-mainTextColor pt-[7%] sm:mt-0 gap-[20px] flex-col'>
      <h2 className='text-[40px] sm:text-[30px] sm:mt-[100px] font-[600]'>
        Корзина пустая <span>😕</span>
      </h2>
      <p className='text-[#a6a5a5] text-[20px] font-[500]'>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br className='sm:hidden' />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img
        src={cartEmptyImg}
        alt='Empty cart'
        className='w-[370px] sm:w-[280px]'
      />
      <Link
        to='/'
        className='py-[14px] flex items-center justify-center gap-[10px] border mt-[20px] bg-[black] text-white hover:bg-[#2c2c2c] rounded-[50px] w-[230px] mx-auto text-[18px] font-[600]'
      >
        <ArrowBackIcon fontSize='medium' />
        <span>Вернуться назад</span>
      </Link>
    </div>
  </div>
)
