import { useLocalization } from '../hooks/useLocalization'

export const SelectLang = () => {
  const { lng, changeLanguage } = useLocalization()

  return (
    <select
      value={lng}
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[50px] pt-[10px] pl-[10px] pb-[10px] pr-[0px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      onChange={e => changeLanguage(e.target.value)}
    >
      <option value={'en'}>En</option>
      <option value={'ru'}>Ru</option>
      <option value={'tj'}>Tj</option>
    </select>
  )
}
