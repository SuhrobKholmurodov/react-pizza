import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import { setSearchValue } from '../redux/filter/slice'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

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
    <div className='relative'>
      <SearchIcon className='absolute dark:text-mainTextColor left-[14px] top-[13px] opacity-30 w-[22px] h-[22px]' />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder='Поиск пиццы...'
        className='border dark:text-mainTextColor border-black/10 p-[11px] pl-[42px] dark:bg-[#161618] w-[400px] sm:w-[260px] rounded-[10px] text-[16px] focus:border-black/20'
      />
      {value && (
        <CloseIcon
          className='absolute right-[15px] dark:text-mainTextColor top-[13px] opacity-30 w-[18px] h-[18px] cursor-pointer hover:opacity-80'
          onClick={onClickClear}
        />
      )}
    </div>
  )
}
