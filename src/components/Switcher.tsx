import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Tooltip } from '@mui/material'
import { useDarkSide, useLocalization } from '../hooks'

export const Switcher = () => {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === 'light' ? true : false
  )
  const { t } = useLocalization()

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
    setDarkSide(checked)
  }

  return (
    <div className='relative'>
      <Tooltip
        title={
          darkSide ? t('switcher.switchToLight') : t('switcher.switchToDark')
        }
        arrow
      >
        <div
          className='relative hover:cursor-pointer flex items-center justify-center border p-[5px] dark:text-mainTextColor border-black/10 dark:border-2 rounded-lg'
          style={{
            width: '46px',
            height: '42px',
            position: 'relative',
            backgroundColor: 'transparent'
          }}
          onClick={() => toggleDarkMode(!darkSide)}
        >
          <Sun
            size={35}
            color='#f39c12'
            className={`absolute transition-opacity duration-500 ease-in-out ${
              darkSide ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              transform: darkSide ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s ease-in-out'
            }}
          />
          <Moon
            size={35}
            color='#9b9b9b'
            className={`absolute transition-opacity duration-500 ease-in-out ${
              darkSide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: darkSide ? 'rotate(0deg)' : 'rotate(-180deg)',
              transition: 'transform 0.5s ease-in-out'
            }}
          />
        </div>
      </Tooltip>
    </div>
  )
}
