import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const BackToHomeButton = () => {
  return (
    <Link
      to='/'
      className='py-[14px] flex items-center justify-center gap-[10px] border mt-[20px] bg-[black] text-white hover:bg-[#2c2c2c] rounded-[50px] w-[230px] mx-auto text-[18px] font-[600]'
    >
      <ArrowBackIcon fontSize='medium' />
      <span>Вернуться назад</span>
    </Link>
  )
}
