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
  <div className='flex text-center justify-center h-[100vh] sm:h-[100%] items-center dark:text-mainTextColor mt-[-10%] sm:mt-0 gap-[20px] flex-col'>
    <h2 className='text-[40px] sm:text-[27px] sm:mt-[100px] font-[600]'>
      {title}
    </h2>
    <p className='text-[#a6a5a5] text-[20px] sm:text-[18px] w-1/2 sm:w-full font-[500]'>
      {subtitle}
    </p>
    {showButton && <BackToHomeButton />}
  </div>
)
