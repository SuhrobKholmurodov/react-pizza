import cartEmptyImg from '../../assets/img/empty-cart.png'
import { BackToHomeButton } from '../BackToHomeButton'
import { CartHeader } from './CartHeader'

export const CartEmpty = () => (
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
      <BackToHomeButton /> 
    </div>
  </div>
)
