import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import useDarkSide from '../hooks/useDarkSide'

export default function Switcher () {
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
      <div
        className='relative flex items-center justify-center'
        style={{
          width: '45px',
          height: '45px',
          position: 'relative',
          borderRadius: '50%',
          backgroundColor: 'transparent'
        }}
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
          size={34}
          color='#9b9b9b'
          className={`absolute transition-opacity duration-500 ease-in-out ${
            darkSide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: darkSide ? 'rotate(0deg)' : 'rotate(-180deg)',
            transition: 'transform 0.5s ease-in-out'
          }}
        />

        <div
          onClick={() => toggleDarkMode(!darkSide)}
          style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '50%',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  )
}
