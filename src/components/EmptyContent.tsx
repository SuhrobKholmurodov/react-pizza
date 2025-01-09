import { BackToHomeButton } from './BackToHomeButton'
interface EmptyContentProps {
  title: string
  subtitle: string
  imageSrc?: string
}
export const EmptyContent = ({ title, subtitle, imageSrc }: EmptyContentProps) => (
  <div className='flex text-center items-center dark:text-mainTextColor pt-[7%] sm:mt-0 gap-[20px] flex-col'>
    <h2 className='text-[40px] sm:text-[30px] sm:mt-[100px] font-[600]'>
      {title}
    </h2>
    <p className='text-[#a6a5a5] text-[20px] w-1/2 font-[500]'>{subtitle}</p>
    {imageSrc && (
      <img
        src={imageSrc}
        alt={'error getting image'}
        className='w-[370px] sm:w-[280px]'
      />
    )}
    <BackToHomeButton />
  </div>
)
