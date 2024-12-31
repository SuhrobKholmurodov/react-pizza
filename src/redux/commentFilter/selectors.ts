import { RootState } from '../store'

export const selectCommentFilter = (state: RootState) => state.commentFilter.filter
