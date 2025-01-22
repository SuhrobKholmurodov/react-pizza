export type ReviewItemProps = {
  id: string
  name: string
  comment: string
  date: { en: string; ru: string; tj: string }
  profilePhoto: string
  rating: number
  recommendation: boolean
}

export type Pizza = {
  id: string
  title: { en: string; ru: string; tj: string }
  prices: number[]
  discountPrices: number[]
  ingredients: { en: string[]; ru: string[]; tj: string[] }
  isNew: boolean
  moreDetails: { en: string; ru: string; tj: string }
  reviews: ReviewItemProps[]
  spicyLevel: number
  preparationTime: number
  calories: number
  deliveryTime: number
  onPromotion: boolean
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error'
}

export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
