import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import useDarkSide from '../hooks/useDarkSide'
import { Tooltip } from '@mui/material'

export const Switcher = () => {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
    setDarkSide(checked)
  }

  return (
    <div className='relative'>
      <Tooltip title={darkSide ? 'Switch to light' : 'Switch to dark'} arrow>
        <div
          className='relative hover:cursor-pointer flex items-center justify-center'
          style={{
            width: '45px',
            height: '45px',
            position: 'relative',
            borderRadius: '50%',
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
