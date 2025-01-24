export const PriceFilter = () => {
  return (
    <div className='flex justify-between gap-[20px]'>
      <div className='relative'>
        <input
          type='number'
          placeholder='139'
          className='w-[160px] px-3 py-2 border focus:ring-slate-200 dark:focus:ring-slate-800 focus:ring-2 border-gray-300 rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-600 pl-10 no-spinners'
        />
        <span className='absolute left-2 top-[20px] transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none'>
          От:
        </span>
      </div>
      <div className='relative'>
        <input
          type='number'
          placeholder='190'
          className='w-[160px] px-3 py-2 border focus:ring-slate-200 dark:focus:ring-slate-800 focus:ring-2 border-gray-300 rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-600 pl-10 no-spinners'
        />
        <span className='absolute left-2 top-[20px] transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none'>
          До:
        </span>
      </div>

      <style>
        {`
          .no-spinners::-webkit-inner-spin-button,
          .no-spinners::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .no-spinners {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </div>
  )
}
