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
                    ? 'bg-black text-white dark:bg-[#32363f]'
                    : 'bg-gray-200 dark:bg-gray-500 dark:text-mainTextColor hover:text-white hover:dark:bg-[#32363f] hover:bg-[#1f1e1e]'
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