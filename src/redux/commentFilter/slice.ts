import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommentFilterSliceState, CommentFilterEnum } from './types'

const initialState: CommentFilterSliceState = {
  filter: CommentFilterEnum.ALL
}

const commentFilterSlice = createSlice({
  name: 'commentFilter',
  initialState,
  reducers: {
    setCommentFilter (state, action: PayloadAction<CommentFilterEnum>) {
      state.filter = action.payload
    },
    resetCommentFilter (state) {
      state.filter = CommentFilterEnum.ALL
    }
  }
})

export const { setCommentFilter, resetCommentFilter } =
  commentFilterSlice.actions

export default commentFilterSlice.reducer
