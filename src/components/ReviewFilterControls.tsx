import { useDispatch, useSelector } from 'react-redux'
import { setCommentFilter } from '../redux/commentFilter/slice'
import { selectCommentFilter } from '../redux/commentFilter/selectors'
import { CommentFilterEnum } from '../redux/commentFilter/types'

export const ReviewFilterControls = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(selectCommentFilter)

  return (
    <div className='flex items-center justify-between gap-[15px] sm:gap-[10px]'>
      <button
        onClick={() => dispatch(setCommentFilter(CommentFilterEnum.ALL))}
        className={`py-[7px] text-[15px] sm:text-[14px] dark:bg-[#2a2c35] hover:bg-[black] dark:text-[#585858] hover:text-white duration-300 px-[20px] sm:px-[10px] rounded-[12px] bg-[#f6f6f9] ${
          currentFilter === CommentFilterEnum.ALL
            ? 'bg-black dark:bg-[white] dark:text-[#585858] text-white'
            : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => dispatch(setCommentFilter(CommentFilterEnum.RECOMMEND))}
        className={`py-[7px] text-[15px] sm:text-[14px] dark:bg-[#2a2c35] hover:bg-[black] dark:text-[#585858] hover:text-white duration-300 px-[35px] sm:px-[10px] rounded-[12px] bg-[#f6f6f9] ${
          currentFilter === CommentFilterEnum.RECOMMEND
            ? 'bg-black dark:bg-[white] dark:text-[#585858] text-white'
            : ''
        }`}
      >
        Recommend
      </button>
      <button
        onClick={() =>
          dispatch(setCommentFilter(CommentFilterEnum.NOT_RECOMMEND))
        }
        className={`py-[7px] text-[15px] sm:text-[14px] dark:bg-[#2a2c35] hover:bg-[black] dark:text-[#585858] hover:text-white duration-300 px-[35px] sm:px-[10px] rounded-[12px] bg-[#f6f6f9] ${
          currentFilter === CommentFilterEnum.NOT_RECOMMEND
            ? 'bg-black dark:bg-[white] dark:text-[#585858] text-white'
            : ''
        }`}
      >
        Not Recommend
      </button>
    </div>
  )
}
