export enum CommentFilterEnum {
  ALL = 'all',
  RECOMMEND = 'recommend',
  NOT_RECOMMEND = 'notRecommend'
}

export interface CommentFilterSliceState {
  filter: CommentFilterEnum
}
