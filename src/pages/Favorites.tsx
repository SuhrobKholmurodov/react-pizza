import { useSelector } from 'react-redux'
import { selectFavorites } from '../redux/favorites/selectors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import { FavoritesEmpty, FavoritesItem } from '../components/Favorites'

const Favorites = () => {
  const { items } = useSelector(selectFavorites)

  return (
    <div className='dark:bg-mainBgColor dark:text-mainTextColor min-h-screen'>
      <div className='flex items-center gap-2 mb-4'>
        <Link to={'/'}>
          <div className='border p-[4px] focus:ring-4 hidden sm:block rounded-lg border-[#2fa4f8]'>
            <ArrowBackIcon className='cursor-pointer text-2xl' />
          </div>
        </Link>
        <h1 className='text-3xl sm:text-[24px] font-bold text-start'>
          My Favorites
        </h1>
      </div>
      {items.length > 0 ? (
        <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
          {items.map(item => (
            <FavoritesItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <FavoritesEmpty />
        </div>
      )}
    </div>
  )
}

export default Favorites
