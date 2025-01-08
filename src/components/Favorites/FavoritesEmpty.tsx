import { BackToHomeButton } from '../BackToHomeButton'

export const FavoritesEmpty = () => (
  <div className='flex text-center items-center dark:text-mainTextColor pt-[7%] sm:mt-0 gap-[20px] flex-col'>
    <h2 className='text-[40px] sm:text-[30px] sm:mt-[100px] font-[600]'>
      Упс, здесь пусто! <span>😔</span>
    </h2>
    <p className='text-[#a6a5a5] text-[20px] font-[500]'>
      Похоже, вы ещё ничего не добавили в избранное.
      <br className='sm:hidden' />
      Начните с главной страницы, чтобы найти что-то особенное!
    </p>
    <BackToHomeButton />
  </div>
)
