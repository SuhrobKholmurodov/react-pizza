import * as React from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '@/redux/filter/slice'
import { Sort as SortType, SortPropertyEnum } from '@/redux/filter/types'
import {
  Select as BaseSelect,
  SelectRootSlotProps,
  SelectProps,
  SelectListboxSlotProps
} from '@mui/base/Select'
import {
  Option as BaseOption,
  OptionProps,
  OptionOwnerState
} from '@mui/base/Option'
import { useTheme } from '@mui/system'
import SortIcon from '@mui/icons-material/Sort'
import clsx from 'clsx'
import { PopupContext } from '@mui/base/Unstable_Popup'
import { CssTransition } from '@mui/base/Transitions'
import { useLocalization } from '@/hooks'


function useIsDarkMode () {
  const theme = useTheme()
  return theme.palette.mode === 'dark'
}

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled
}: Partial<OptionOwnerState<number>>) => {
  let classes = ''
  if (disabled) {
    classes += 'text-slate-400 dark:text-slate-700'
  } else {
    if (selected) {
      classes +=
        ' bg-gray-100 dark:bg-gray-700 text-[black] dark:text-purple-50'
    } else if (highlighted) {
      classes +=
        ' bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300'
    }
    classes +=
      ' hover:dark:bg-slate-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900'
    classes +=
      ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:dark:outline-purple-300'
  }
  return classes
}

const Option = React.forwardRef<HTMLLIElement, OptionProps<SortPropertyEnum>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 hover:cursor-pointer rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`
          })
        }}
      />
    )
  }
)

const Button = React.forwardRef(function Button<
  TValue extends object,
  Multiple extends boolean
> (
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props
  console.log(ownerState)
  return (
    <button type='button' {...other} ref={ref}>
      {other.children}
      <SortIcon />
    </button>
  )
})

const AnimatedListbox = React.forwardRef(function AnimatedListbox<
  Value extends object,
  Multiple extends boolean
> (
  props: SelectListboxSlotProps<Value, Multiple>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { ownerState, ...other } = props
  console.log(ownerState)
  const popupContext = React.useContext(PopupContext)
  const verticalPlacement = popupContext?.placement.split('-')[0]

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName='open'
      exitClassName='closed'
    >
      <ul {...other} ref={ref} />
    </CssTransition>
  )
})

const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === 'function' ? fn(args) : fn

const Select = React.forwardRef(function CustomSelect<
  TValue extends object,
  Multiple extends boolean
> (
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const isDarkMode = useIsDarkMode()

  return (
    <BaseSelect
      ref={ref}
      {...props}
      slots={{
        root: Button,
        listbox: AnimatedListbox,
        ...props.slots
      }}
      className={clsx('CustomSelect', props.className)}
      slotProps={{
        ...props.slotProps,
        root: ownerState => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative text-sm font-sans box-border w-[340px] px-3 py-2 rounded-lg text-left bg-white dark:bg-neutral-900 border border-solid border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-neutral-300 transition-all hover:bg-slate-50 dark:hover:bg-neutral-800 outline-0 shadow-md shadow-slate-100 dark:shadow-slate-900 ${
                ownerState.focusVisible
                  ? 'focus-visible:ring-4 ring-purple-500/30 focus-visible:border-purple-500 focus-visible:dark:border-purple-500'
                  : ''
              } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-2.5`,
              resolvedSlotProps?.className
            )
          }
        },
        listbox: ownerState => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-sans p-1.5 my-3 w-[340px] rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow shadow-slate-200 dark:shadow-slate-900 [.open_&]:opacity-100 [.open_&]:scale-100 transition-[opacity,transform] [.closed_&]:opacity-0 [.closed_&]:scale-90 [.placement-top_&]:origin-bottom [.placement-bottom_&]:origin-top`,
              resolvedSlotProps?.className
            )
          }
        },
        popup: ownerState => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popup,
            ownerState
          )
          return {
            ...resolvedSlotProps,
            className: clsx(
              `${isDarkMode ? 'dark' : ''} z-10`,
              resolvedSlotProps?.className
            )
          }
        }
      }}
    />
  )
})

type SortPopupProps = {
  value: SortType
}

export const Sort = React.memo(({ value }: SortPopupProps) => {
  const dispatch = useDispatch()
  const isDarkMode = useIsDarkMode()
  const [selectedSort, setSelectedSort] = React.useState(value.sortProperty)

  const { t } = useLocalization()

  const sortList = [
    {
      name: t('sort.popular'),
      sortProperty: SortPropertyEnum.RATING_DESC
    },
    {
      name: t('sort.unPopular'),
      sortProperty: SortPropertyEnum.RATING_ASC
    },
    {
      name: t('sort.cheapestFirst'),
      sortProperty: SortPropertyEnum.PRICE_DESC
    },
    {
      name: t('sort.expensiveFirst'),
      sortProperty: SortPropertyEnum.PRICE_ASC
    },
    {
      name: t('sort.byNumRevDesc'),
      sortProperty: SortPropertyEnum.REVIEWS_CNT_DESC
    },
    {
      name: t('sort.byNumRevAsc'),
      sortProperty: SortPropertyEnum.REVIEWS_CNT_ASC
    },
    {
      name: t('sort.newArrivals'),
      sortProperty: SortPropertyEnum.IS_NEW
    },
    {
      name: t('sort.za'),
      sortProperty: SortPropertyEnum.TITLE_DESC
    },
    {
      name: t('sort.az'),
      sortProperty: SortPropertyEnum.TITLE_ASC
    }
  ]

  const handleChange = (newValue: SortPropertyEnum) => {
    if (newValue) {
      setSelectedSort(newValue)
      const selectedSortItem = sortList.find(
        item => item.sortProperty === newValue
      )

      if (selectedSortItem) {
        dispatch(setSort(selectedSortItem))
      }
    } else {
      console.log('Сортировка не выбрана')
    }
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Select
        value={selectedSort as unknown as object}
        onChange={(_, newValue) =>
          handleChange(newValue as unknown as SortPropertyEnum)
        }
      >
        {sortList.map(item => (
          <Option key={item.sortProperty} value={item.sortProperty}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
})

export default Sort
