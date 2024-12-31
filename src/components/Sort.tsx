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
  isNew?: boolean
}

const sortList: SortItem[] = [
  { name: 'Популярные', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'Не популярные', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Сначала дешевые', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'Сначала дорогие', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'Новинки', sortProperty: SortPropertyEnum.IS_NEW },
  { name: 'Я-А', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'А-Я', sortProperty: SortPropertyEnum.TITLE_ASC }
]

type SortPopupProps = {
  value: SortType
}

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [selectedSort, setSelectedSort] = React.useState(value.sortProperty)

  const handleChange = event => {
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
        className='dark:bg-[#161618] dark:text-mainTextColor'
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
          className='dark:bg-[#161618] dark:text-mainTextColor'
        >
          {sortList.map(obj => (
            <MenuItem
              key={obj.sortProperty}
              value={obj.sortProperty}
              className='dark:bg-[#161618] dark:text-mainTextColor'
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
