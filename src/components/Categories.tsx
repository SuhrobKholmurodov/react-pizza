import React from 'react'
type CategoriesProps = {
  value: number
  onChangeCategory: (idx: number) => void
}
const categories = [
  'Все',
  'Детям',
  'Куриные',
  'Вегетарианская',
  'Острые',
  'Сырные'
]
export const Categories = React.memo(
  ({ value, onChangeCategory }: CategoriesProps) => {
    return (
      <div className='relative max-w-full overflow-x-auto'>
        <ul className='flex space-x-4 list-none py-2 px-[2px]'>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={`cursor-pointer rounded-full transition-colors duration-200 
                px-4 py-2 text-center flex items-center justify-center
                ${
                  value === i
                    ? 'bg-black dark:bg-gray-700 text-white'
                    : 'bg-gray-200 dark:text-mainTextColor dark:bg-[#202127] hover:text-white hover:dark:bg-[#252a34] hover:bg-[#1f1e1e]'
                }`}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
