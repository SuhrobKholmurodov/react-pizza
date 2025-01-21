import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useLocalization = () => {
  const { t, i18n } = useTranslation()
  const [lng, setLng] = useState(i18n.language)

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLng(language)
  }

  return { t, lng, changeLanguage }
}
