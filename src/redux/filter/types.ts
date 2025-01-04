export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  IS_NEW = 'isNew',
  REVIEWS_CNT_DESC = 'reviews',
  REVIEWS_CNT_ASC = '-reviews'
}

export type Sort = {
  name: string
  sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}
