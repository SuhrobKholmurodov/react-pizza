import { useLocalization } from "@/hooks"

export const NotFound = () => {
  const { t } = useLocalization()

  return (
    <div className='p-[100px] max-w-[750px] mx-auto text-center'>
      <h1>
        <span className='text-[64px] '>😕</span>
        <br />
        {t('notFound.firstMsg')}
      </h1>
      <p className='text-[22px]'>{t('notFound.secMsg')}</p>
    </div>
  )
}
