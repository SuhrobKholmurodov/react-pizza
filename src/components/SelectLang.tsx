import { useState } from 'react'
import { Language, useLocalization } from '../hooks'

export const SelectLang = () => {
  const { lng, changeLanguage } = useLocalization()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <select
        value={lng}
        className='block sm:hidden bg-white border-black/10 dark:border-2 dark:bg-mainBgColor border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[50px] pt-[10px] pl-[10px] pb-[10px] pr-[0px] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        onChange={e => handleLanguageChange(e.target.value as Language)}
      >
        <option value='en'>En</option>
        <option value='ru'>Ru</option>
        <option value='tj'>Tj</option>
      </select>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className=' hidden sm:block border pl-[13px] pr-[13px] pt-[10px] pb-[10px] dark:text-mainTextColor border-black/10 dark:border-2 rounded-lg focus:outline-none'
      >
        {lng.toUpperCase()}
      </button>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`fixed hidden sm:block bottom-0 left-0 right-0 bg-white dark:bg-mainBgColor rounded-t-2xl p-6 transition-transform duration-300 ${
            isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <h2 className='text-lg font-semibold mb-4 dark:text-white'>
            Select Language
          </h2>
          <div className='space-y-3'>
            {(
              [
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'ru', name: 'Russian', flag: '🇷🇺' },
                { code: 'tj', name: 'Tajik', flag: '🇹🇯' }
              ] as const
            ).map(({ code, name, flag }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-left p-2 rounded-lg flex items-center space-x-3 ${
                  lng === code
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                <span className='text-xl'>{flag}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
