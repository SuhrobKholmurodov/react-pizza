import { BackToHomeButton } from './BackToHomeButton'

interface EmptyContentProps {
  title: string
  subtitle: string
  showButton?: boolean
}

export const EmptyContent = ({
  title,
  subtitle,
  showButton
}: EmptyContentProps) => (
  <div className='flex flex-col text-center justify-center items-center h-[calc(100vh-160px)] sm:h-[calc(100vh-120px)] p-4 dark:text-mainTextColor'>
    <h2 className='text-4xl sm:text-2xl font-semibold mb-4'>{title}</h2>
    <p className='text-[#a6a5a5] text-xl sm:text-base font-medium max-w-2xl sm:max-w-full mb-6'>
      {subtitle}
    </p>
    {showButton && <BackToHomeButton />}
  </div>
)
