import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
export type Language = 'en' | 'ru' | 'tj'

export const useLocalization = () => {
  const { t, i18n } = useTranslation()
  const [lng, setLng] = useState<Language>(i18n.language as Language)

  useEffect(() => {
    const handleLanguageChange = (language: Language) => {
      setLng(language)
    }

    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language)
  }

  return { t, lng, changeLanguage }
}
