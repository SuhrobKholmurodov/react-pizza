import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const FavoritesEmpty = () => (
  <div className='flex text-center min-h-screen  items-center dark:text-mainTextColor pt-[7%] sm:mt-0 gap-[20px] flex-col'>
    <h2 className='text-[40px] sm:text-[30px] sm:mt-[100px] font-[600]'>
      Упс, здесь пусто! <span>😔</span>
    </h2>
    <p className='text-[#a6a5a5] text-[20px] font-[500]'>
      Похоже, вы ещё ничего не добавили в избранное.
      <br className='sm:hidden' />
      Начните с главной страницы, чтобы найти что-то особенное!
    </p>
    <Link
      to='/'
      className='py-[14px] flex items-center justify-center gap-[10px] border mt-[20px] bg-[#007bff] text-white hover:bg-[#0056b3] rounded-[50px] w-[230px] mx-auto text-[18px] font-[600]'
    >
      <ArrowBackIcon fontSize='medium' />
      <span>На главную</span>
    </Link>
  </div>
)
