import React from 'react'

type CategoriesProps = {
  value: number
  onChangeCategory: (idx: number) => void
}

const categories = [
  'Все',
  'Детям',
  'Куриные',
  'Острые',
  'Вегетарианская',
  'Сырные'
]

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className='relative max-w-full overflow-x-auto'>
        <ul className='flex space-x-4 list-none p-2'>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={`cursor-pointer rounded-full transition-colors duration-200 
                px-4 py-2 text-center flex items-center justify-center
                ${
                  value === i
                    ? 'bg-black dark:bg-[#151d47] text-white'
                    : 'bg-gray-200 dark:text-mainTextColor dark:bg-[#2a2c35] hover:text-white hover:dark:bg-[#252a34] hover:bg-[#1f1e1e]'
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
