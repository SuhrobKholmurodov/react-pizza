import { ArrowUp } from 'lucide-react'

export const GoTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-[88px] right-4 p-2 border border-[#b4b2b2] backdrop-blur-sm text-blue-800 rounded-full cursor-pointer z-[1000] flex items-center justify-center dark:text-blue-400'
    >
      <ArrowUp size={26} />
    </button>
  )
}
