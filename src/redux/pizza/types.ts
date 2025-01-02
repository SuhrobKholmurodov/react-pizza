export type ReviewItemProps = {
  id: string
  name: string
  comment: string
  date: string
  profilePhoto: string
  rating: number
  recommendation: boolean
}

export type Pizza = {
  id: string;
  title: string;
  prices: number[];
  discountPrices: number[];
  reviews: ReviewItemProps[];
  deliveryTime: number;
  onPromotion: boolean;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
