import { useState } from 'react'
import { Sun, MoonStar } from 'lucide-react'
import { Tooltip } from '@mui/material'
import { useDarkSide, useLocalization } from '@/hooks'
import { motion } from 'framer-motion'

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
          className='relative hover:border-gray-400 dark:hover:border-gray-500 hover:cursor-pointer flex items-center justify-center p-[5px] dark:text-mainTextColor border border-gray-300 dark:border-gray-600 rounded-lg'
          style={{
            width: '46px',
            height: '42px',
            position: 'relative',
            backgroundColor: 'transparent'
          }}
          onClick={() => toggleDarkMode(!darkSide)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: darkSide ? 0 : 1, scale: darkSide ? 0.8 : 1 }}
            transition={{ duration: 0.3 }}
            className='absolute'
          >
            <Sun size={28} color='#f39c12' />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: darkSide ? 1 : 0, scale: darkSide ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className='absolute'
          >
            <MoonStar size={28} color='#9b999b' />
          </motion.div>
        </div>
      </Tooltip>
    </div>
  )
}
