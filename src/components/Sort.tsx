import * as React from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../redux/filter/slice'
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

type SortItem = {
  name: string
  sortProperty: SortPropertyEnum
  reviewsCnt?: number
  isNew?: boolean
}

const sortList: SortItem[] = [
  { name: 'Популярные', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'Не популярные', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Сначала дешевые', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'Сначала дорогие', sortProperty: SortPropertyEnum.PRICE_ASC },
  {
    name: 'По количеству отзывов (от большего)',
    sortProperty: SortPropertyEnum.REVIEWS_CNT_DESC
  },
  {
    name: 'По количеству отзывов (от меньшего)',
    sortProperty: SortPropertyEnum.REVIEWS_CNT_ASC
  },
  { name: 'Новинки', sortProperty: SortPropertyEnum.IS_NEW },
  { name: 'Я-А', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'А-Я', sortProperty: SortPropertyEnum.TITLE_ASC }
]

type SortPopupProps = {
  value: SortType
}

export const Sort = React.memo(({ value }: SortPopupProps) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [selectedSort, setSelectedSort] = React.useState(value.sortProperty)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const selectedValue = event.target.value

    if (selectedValue) {
      setSelectedSort(selectedValue)
      const selectedSortItem = sortList.find(
        item => item.sortProperty === selectedValue
      )
      if (selectedSortItem) {
        dispatch(setSort(selectedSortItem))
        if (selectedSortItem.sortProperty === SortPropertyEnum.IS_NEW) {
          sortList.sort((a, b) => {
            if (a.isNew && !b.isNew) return -1
            if (!a.isNew && b.isNew) return 1
            return 0
          })
        } else if (
          selectedSortItem.sortProperty === SortPropertyEnum.REVIEWS_CNT_DESC ||
          selectedSortItem.sortProperty === SortPropertyEnum.REVIEWS_CNT_ASC
        ) {
          sortList.sort((a, b) => {
            console.log('a', a, 'b', b)
            const reviewsCntA = a.reviewsCnt ?? 0
            const reviewsCntB = b.reviewsCnt ?? 0
            if (
              selectedSortItem.sortProperty ===
              SortPropertyEnum.REVIEWS_CNT_DESC
            ) {
              return reviewsCntB - reviewsCntA
            }
            return reviewsCntA - reviewsCntB
          })
        }
      }
    } else {
      console.log('Сортировка не выбрана')
    }
  }

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: 330 }}
        className='dark:bg-gray-700 dark:text-mainTextColor'
      >
        <InputLabel id='sort-select-label' className='dark:text-mainTextColor'>
          Сортировать
        </InputLabel>
        <Select
          labelId='sort-select-label'
          id='sort-select'
          value={selectedSort}
          onChange={handleChange}
          input={<OutlinedInput label='Сортировка по:' />}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
            '& .MuiSelect-icon': {
              color: theme.palette.primary.main
            }
          }}
          className='dark:bg-gray-700 dark:text-mainTextColor'
        >
          {sortList.map(obj => (
            <MenuItem
              key={obj.sortProperty}
              value={obj.sortProperty}
              className='dark:bg-gray-700 hover:dark:bg-[#333746] hover:dark:text-[#838282] dark:text-gray-500'
              style={{
                fontWeight:
                  selectedSort === obj.sortProperty
                    ? theme.typography.fontWeightMedium
                    : theme.typography.fontWeightRegular
              }}
            >
              {obj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
})
