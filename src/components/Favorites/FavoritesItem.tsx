interface FavoritesItemProps {
  item: {
    id: string
    imageUrl: string
    title: string
    prices: number[]
    discountPrices?: number[]
  }
}

export const FavoritesItem = ({ item }: FavoritesItemProps) => {
  return (
    <div className='bg-white dark:bg-mainBgColor hover:shadow-lg dark:hover:shadow-black rounded-lg transition-shadow duration-300 ease-in-out'>
      <div className='relative flex items-center justify-center'>
        <img
          className='w-[260px] h-auto object-cover rounded-md'
          src={item.imageUrl}
          alt={item.title}
        />
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2 dark:text-mainTextColor'>
          {item.title}
        </h2>
        <div className='flex items-center gap-2 mb-2'>
          {item.discountPrices && item.discountPrices[0] !== null ? (
            <>
              <span className='text-lg font-bold text-red-600'>
                ${item.discountPrices[0]}
              </span>
              <span className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                ${item.prices[0]}
              </span>
            </>
          ) : (
            <span className='text-lg font-bold dark:text-mainTextColor'>
              ${item.prices[0]}
            </span>
          )}
        </div>
        <button className='bg-orange-500 w-full text-white py-[10px] rounded-[8px] hover:bg-orange-400 transition duration-300'>
          Просмотр
        </button>
      </div>
    </div>
  )
}
