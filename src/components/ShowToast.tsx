import toast from 'react-hot-toast'

interface ShowToastProps {
  message: string
  duration: number
}

export const ShowToast = ({ message, duration }: ShowToastProps) => {
  toast.success(
    <div className='flex items-center'>
      <h4 className='text-[15px] text-center dark:text-mainTextColor'>
        {message}
      </h4>
    </div>,
    {
      position: 'top-center',
      duration: duration,
      style: {
        backgroundColor: document.documentElement.classList.contains('dark')
          ? '#272730'
          : '#ffffff',
        color: document.documentElement.classList.contains('dark')
          ? '#f5f5f5'
          : '#000000'
      }
    }
  )
}
