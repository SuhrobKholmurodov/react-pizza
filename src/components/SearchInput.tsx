import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { Close, Search } from '@mui/icons-material'
import { setSearchValue } from '../redux/filter/slice'
import { useLocalization } from '../hooks'

export const SearchInput = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { t } = useLocalization()

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 1000),
    []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className='relative sm:ml-[-5px]'>
      <Search className='absolute dark:text-mainTextColor left-[14px] top-[10px] opacity-30 w-[22px] h-[22px]' />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder={t('searchInput.pizzaSearch')}
        className='dark:text-mainTextColor border-black/10 p-[8px] sm:p-[8.5px] sm:pl-[45px] pl-[42px] pr-[42px] dark:bg-[#161618] w-full rounded-lg text-[16px] focus:border-black/20 border border-gray-300 dark:border-gray-600'
      />
      {value && (
        <Close
          className='absolute bg-[white] dark:bg-[#161618] right-[15px] sm:right-[14px] dark:text-mainTextColor sm:top-[10px] top-[10px] opacity-30 w-[18px] h-[18px] cursor-pointer hover:opacity-80'
          onClick={onClickClear}
        />
      )}
    </div>
  )
}
