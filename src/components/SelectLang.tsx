import { useState } from 'react'
import { Language, useLocalization } from '@/hooks'

export const SelectLang = () => {
  const { lng, changeLanguage, t } = useLocalization()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <select
        value={lng}
        className='hover:cursor-pointer sm:hidden bg-white dark:bg-mainBgColor border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm p-[5px] w-auto h-[42px] transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-500'
        onChange={e => handleLanguageChange(e.target.value as Language)}
      >
        <option value='en'>{t('selectLang.shortFormEn')}</option>
        <option value='ru'>{t('selectLang.shortFormRu')}</option>
        <option value='tj'>{t('selectLang.shortFormTj')}</option>
      </select>

      <button
        onClick={() => setIsDrawerOpen(true)}
        className='hidden sm:block p-[5px] w-[42px] h-[42px] sm:w-[75px] dark:text-mainTextColor border-black/10 rounded-lg focus:outline-none border border-gray-300 dark:border-gray-600'
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
          className={`fixed hidden sm:block bottom-0 left-0 right-0 bg-white dark:bg-mainBgColor rounded-t-2xl px-4 py-6 transition-transform duration-300 ${
            isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className='flex items-center justify-center'>
            <p className='w-[60px] h-[5px] rounded-b-3xl mt-[-15px] bg-gray-500 dark:bg-gray-700 mb-[10px]'></p>
          </div>
          <h2 className='text-lg text-center font-semibold mb-4 dark:text-white'>
            {t('selectLang.selectLang')}
          </h2>
          <div className='space-y-4'>
            {(
              [
                { code: 'en', name: t('selectLang.longFormEn'), flag: '🇺🇸' },
                { code: 'ru', name: t('selectLang.longFormRu'), flag: '🇷🇺' },
                { code: 'tj', name: t('selectLang.longFormTj'), flag: '🇹🇯' }
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
