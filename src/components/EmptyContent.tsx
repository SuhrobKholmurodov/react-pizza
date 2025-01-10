import { BackToHomeButton } from './BackToHomeButton'
interface EmptyContentProps {
  title: string
  subtitle: string
  imageSrc?: string
  showButton?: boolean
}
export const EmptyContent = ({
  title,
  subtitle,
  imageSrc,
  showButton
}: EmptyContentProps) => (
  <div className='flex text-center justify-center h-[100vh] sm:h-[100%] items-center dark:text-mainTextColor mt-[-10%] sm:mt-0 gap-[20px] flex-col'>
    <h2 className='text-[40px] sm:text-[30px] sm:mt-[100px] font-[600]'>
      {title}
    </h2>
    <p className='text-[#a6a5a5] text-[20px] w-1/2 sm:w-full font-[500]'>
      {subtitle}
    </p>
    {imageSrc && (
      <img
        src={imageSrc}
        alt={'error getting image'}
        className='w-[370px] sm:w-[280px]'
      />
    )}
    {showButton && <BackToHomeButton />}
  </div>
)
